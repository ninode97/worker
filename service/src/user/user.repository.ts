import { EntityRepository, Repository, Not } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';

import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../role/role.entity';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { UserDto } from './dto/user.dto';

interface ReactClientData {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  isBlocked: boolean;
}

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async updatePassword(changePasswordDto: ChangePasswordDto) {
    const { username, password } = changePasswordDto;
    const user = await this.findOne({ where: { username: username } });
    try {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      user.save();
    } catch (err) {
      throw new InternalServerErrorException("Couldn't change the password");
    }
  }
  async updateUser(username: string, updateUserDto: UpdateUserDto, role: Role) {
    const user = await this.findOne({ where: { username: username } });
    const {
      password,
      firstName,
      lastName,
      isBlocked,
      last4DigitsOfId,
    } = updateUserDto;

    try {
      if (password)
        this.updatePassword({ username, password } as ChangePasswordDto);
      if (role) user.role = role;
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (isBlocked !== null) user.isBlocked = isBlocked;
      if (last4DigitsOfId) user.last4DigitsOfId = last4DigitsOfId;
      user.save();
      return user;
    } catch (err) {
      throw new NotFoundException('User was not found!');
    }
  }

  async signUp(signUpDto: SignUpDto, role: Role) {
    const { username, password, firstName, lastName } = signUpDto;

    if (!role) {
      throw new NotFoundException('There is no such role');
    }

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = role;
    user.firstName = firstName;
    user.lastName = lastName;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    await user.save();
  }

  async addUser(newUser: UserDto, role: Role) {
    console.log(newUser);
    const { username, password, firstName, lastName } = newUser;

    if (!role) {
      throw new NotFoundException('There is no such role');
    }

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = role;
    user.firstName = firstName;
    user.lastName = lastName;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException('Username already exists!');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    await user.save();
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<ReactClientData> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return {
        username: user.username,
        role: user.role.role,
        firstName: user.firstName,
        lastName: user.lastName,
        isBlocked: user.isBlocked,
      };
    } else {
      return null;
    }
  }

  async changeBlockStatus(userId: number) {
    const user = await this.findOne(userId);

    if (!user) {
      throw new NotFoundException();
    }
    user.isBlocked = !user.isBlocked;
    try {
      user.save();
    } catch (err) {
      console.log(err);
    }
  }

  async getUsersByBlockStatus(user: User, isBlocked: boolean) {
    const users = await this.find({
      where: { isBlocked, username: Not(user.username) },
    });
    return this.sortRecords(users);
  }

  private sortRecords(users) {
    return users.sort((a, b) =>
      a.lastName > b.lastName
        ? 1
        : a.lastName === b.lastName
        ? a.firstName > b.firstName
          ? 1
          : -1
        : -1,
    );
  }
}

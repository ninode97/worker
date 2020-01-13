import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
// import { GetUserDto } from './dto/get-user-dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleRepository } from '../role/role.repository';
import { Role } from '../role/role.entity';
import { SignUpDto } from '../auth/dto/sign-up.dto';
import { Not } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    @InjectRepository(Role)
    private roleRepository: RoleRepository,
  ) {}

  // async findUser(getUserDto: GetUserDto) {
  //   console.log(getUserDto);
  //   const user = await this.userRepository.findOne({ where: getUserDto });
  //   console.log(user);
  //   if (user) {
  //     return { username: user.username, role: user.role };
  //   }
  // }

  async updatePassword(changePasswordDto: ChangePasswordDto) {
    return this.userRepository.updatePassword(changePasswordDto);
  }

  async updateUser(username: string, updateUserDto: UpdateUserDto) {
    const role = await this.roleRepository.findOne({
      where: { role: updateUserDto.role },
    });
    return this.userRepository.updateUser(username, updateUserDto, role);
  }

  async signUp(signUpDto: SignUpDto) {
    const role = await this.roleRepository.findOne({
      where: {
        role: 'user',
      },
    });
    return this.userRepository.signUp(signUpDto, role);
  }
  async addUser(newUser: UserDto) {
    const role = await this.roleRepository.findOne({
      where: {
        role: 'user',
      },
    });
    return this.userRepository.addUser(newUser, role);
  }

  async getAllUsernames() {
    const users = await this.userRepository.find();
    return users.map(user => user.username);
  }
  async getAllUsernamesTest(username: string) {
    const users = this.sortRecords(
      await this.userRepository.find({
        where: { username: Not(username) },
      }),
    );

    return users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      isBlocked: user.isBlocked,
      userId: user.id,
    }));
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

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }

  async changeBlockStatus(userId: number) {
    return this.userRepository.changeBlockStatus(userId);
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      isBlocked: user.isBlocked,
    };
  }

  async getUsersByBlockStatus(user: User, isBlocked: boolean) {
    const users = await this.userRepository.getUsersByBlockStatus(
      user,
      isBlocked,
    );
    return users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      isBlocked: user.isBlocked,
      userId: user.id,
    }));
  }
}

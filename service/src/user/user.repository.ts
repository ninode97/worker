import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password.dto';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

interface ReactClientData {
  username: string;
  role: string;
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
      console.log(err);
      throw new InternalServerErrorException("Couldn't change the password");
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const exists = this.findOne({ username });

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.role = 'user';

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
      return { username: user.username, role: user.role };
    } else {
      return null;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { GetUserDto } from './dto/get-user-dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async findUser(getUserDto: GetUserDto) {
    const user = await this.userRepository.findOne({ where: getUserDto });
    if (user) {
      return { username: user.username, role: user.role };
    }
  }

  async updatePassword(changePasswordDto: ChangePasswordDto) {
    return this.userRepository.updatePassword(changePasswordDto);
  }
}

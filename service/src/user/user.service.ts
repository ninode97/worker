import { Injectable } from '@nestjs/common';
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

  async getAllUsernames() {
    const users = await this.userRepository.find();
    return users.map(user => user.username);
  }
  async getAllUsernamesTest(username: string) {
    const users = await this.userRepository.find({
      where: { username: Not(username) },
    });
    return users.map(user => ({
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
    }));
  }

  async getUserByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    return user;
  }
}

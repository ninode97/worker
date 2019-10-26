import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    console.log(this.userRepository);
  }

  signUp(loginUserDto: LoginUserDto) {
    return this.userRepository.signUp(loginUserDto);
  }

  async signIn(loginUserDto: LoginUserDto) {
    const username = this.userRepository.validateUserPassword(loginUserDto);
    if (username === null) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return username;
  }
}

import { Injectable } from '@nestjs/common';
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
}

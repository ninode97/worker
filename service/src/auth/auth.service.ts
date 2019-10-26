import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    console.log(this.userRepository);
  }

  signUp(loginUserDto: LoginUserDto) {
    return this.userRepository.signUp(loginUserDto);
  }

  async signIn(loginUserDto: LoginUserDto) {
    const username = await this.userRepository.validateUserPassword(
      loginUserDto,
    );

    if (username === null) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}

import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { PushtokenService } from 'src/pushtoken/pushtoken.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private userService: UserService,
    private jwtService: JwtService,
    private pushTokenService: PushtokenService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userService.signUp(signUpDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const payload = await this.validateAuthDto(authCredentialsDto);
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }

  async handlePushNotificationByJwt(dto, pushtoken) {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    return this.handlePushNotificationByUser(user, pushtoken);
  }
  async handlePushNotificationByUser(user: User, pushToken: string) {
    return this.pushTokenService.add(user, pushToken);
  }

  private async validateAuthDto(dto: AuthCredentialsDto): Promise<JwtPayload> {
    const user = await this.userRepository.validateUserPassword(dto);

    if (!user || (user && user.isBlocked)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { username, role, firstName, lastName } = user;

    return {
      username,
      role,
      firstName,
      lastName,
    };
  }
}

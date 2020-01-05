import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Request,
  Put,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { PushtokenService } from 'src/pushtoken/pushtoken.service';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    console.log(signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { pushToken } = authCredentialsDto;
    const accessToken = await this.authService.signIn(authCredentialsDto);
    this.authService.handlePushNotificationByJwt(authCredentialsDto, pushToken);
    return accessToken;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/')
  isTokenValid(@GetUser() user: User, @Body('pushToken') pushToken: string) {
    this.authService.handlePushNotificationByUser(user, pushToken);
    return { isValid: true };
  }
}

import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/logout')
  logout() {
    return 'Logging Out!';
  }

  @Post('/signup')
  signUp(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signUp(loginUserDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }
}

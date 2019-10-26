import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    return 'Logging In!';
  }

  @Post('/logout')
  logout() {
    return 'Logging Out!';
  }

  @Post('/signup')
  signUp(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signUp(loginUserDto);
  }
}

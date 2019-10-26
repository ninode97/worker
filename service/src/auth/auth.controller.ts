import { Controller, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto) {
    console.log(loginUserDto);
    return 'Logging In!';
  }

  @Post('/logout')
  logout() {
    return 'Logging Out!';
  }
}

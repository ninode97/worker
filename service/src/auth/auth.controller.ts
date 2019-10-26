import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/login')
  login() {
    return 'Logging In!';
  }

  @Post('/logout')
  logout() {
    return 'Logging Out!';
  }
}

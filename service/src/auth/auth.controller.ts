import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post()
  login() {
    return 'Logging In!';
  }

  @Post()
  logout() {
    return 'Logging Out!';
  }
}

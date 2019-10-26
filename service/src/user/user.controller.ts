import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  @Get()
  getMe(@Req() request: Request) {
    console.log(request);
    return 'OOK!';
  }
}

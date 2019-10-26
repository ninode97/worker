import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  @Get('/')
  getMe(@Req() request: Request) {
    return 'ook';
  }
}

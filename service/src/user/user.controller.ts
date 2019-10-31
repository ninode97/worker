import {
  Controller,
  Get,
  UseGuards,
  Req,
  ValidationPipe,
  Body,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUserDto } from './dto/get-user-dto';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/')
  getUserById(@Body(ValidationPipe) getUserDto: GetUserDto) {
    if (Object.keys(getUserDto).length > 0) {
      return this.userService.findUser(getUserDto);
    } else {
      throw new BadRequestException(
        'You need to provide either username or id of the user!',
      );
    }
  }
  @Post('/password')
  updateUserPassword(
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.updatePassword(changePasswordDto);
  }
}

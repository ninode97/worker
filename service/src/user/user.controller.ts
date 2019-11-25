import {
  Controller,
  UseGuards,
  ValidationPipe,
  Body,
  BadRequestException,
  Post,
  Param,
  Put,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUserDto } from './dto/get-user-dto';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './user.entity';

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

  @Put('/:username')
  updateUser(
    @Param('username') username: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto);
    console.log(username);
    return this.userService.updateUser(username, updateUserDto);
  }

  @Get('/')
  getAllUsers(@GetUser() user: User) {
    if (user.role.role === 'admin') {
      return this.userService.getAllUsernames();
    }
    throw new UnauthorizedException();
  }
}

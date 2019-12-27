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
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './user.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/password')
  updateUserPassword(
    @GetUser() requestedBy: User,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ) {
    if (requestedBy.role.role !== 'admin') {
      throw new UnauthorizedException(
        'You are not allowed to update another user..',
      );
    }
    return this.userService.updatePassword(changePasswordDto);
  }
  @Put('/:username')
  updateUser(
    @GetUser() requestedBy: User,
    @Param('username') username: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const roles = ['admin', 'user'];
    const { password, role } = updateUserDto;
    if (requestedBy.role.role !== 'admin') {
      throw new UnauthorizedException(
        'You are not allowed to update another user..',
      );
    }
    return this.userService.updateUser(username, updateUserDto);
  }
  @Get('/user/:username')
  async getUserByUsername(
    @GetUser() requestedBy: User,
    @Param('username') username: string,
  ) {
    const user = await this.userService.getUserByUsername(username);
    if (!username || !user) {
      throw new NotFoundException('User was not found!');
    }
    delete user.salt;
    delete user.password;
    return user;
  }

  @Get()
  getAllUsers(@GetUser() user: User) {
    if (user.role.role === 'admin') {
      return this.userService.getAllUsernames();
    }
    throw new UnauthorizedException();
  }
}

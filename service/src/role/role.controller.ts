import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleService } from './role.service';

@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  getAllRoles() {
    this.roleService.getAllRoles();
  }
}

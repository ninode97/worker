import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  getAllRoles() {
    return this.roleService.getAllRoles();
  }
  @Get('/:roleName')
  getRoleByRoleName(@Param() params) {
    const { roleName } = params;
    return this.roleService.getRoleByName(roleName);
  }
}

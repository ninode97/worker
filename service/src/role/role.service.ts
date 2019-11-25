import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: RoleRepository,
  ) {}

  async getAllRoles(): Promise<Role[]> {
    return this.roleRepository.find();
  }
  async getRoleByName(role: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { role: role } });
  }
}

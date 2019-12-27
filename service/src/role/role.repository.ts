import { EntityRepository, Repository } from 'typeorm';
import { Role } from './role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  async getAllRoles(): Promise<Role[]> {
    return this.find();
  }
  async getRoleByName(role: string): Promise<Role> {
    return this.findOne({ where: { role: role } });
  }
}

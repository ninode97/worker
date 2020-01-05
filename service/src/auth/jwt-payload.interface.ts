import { Role } from '../role/role.entity';

export interface JwtPayload {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

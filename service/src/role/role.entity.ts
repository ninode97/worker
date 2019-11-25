import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Unique(['role'])
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ default: 0 })
  accessLevel: number;

  @Column({ default: new Date().toUTCString() })
  createdAt: string;

  @OneToOne(type => User, user => user.role.role) // specify inverse side as a second parameter
  user: User;
}

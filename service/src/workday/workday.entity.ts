import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WorkdayInfo } from './workday-info.entity';

@Entity()
@Unique(['workday'])
export class Workday extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'workday', type: 'date' })
  workday: Date;
}

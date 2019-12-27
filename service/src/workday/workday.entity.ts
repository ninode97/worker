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
  BeforeInsert,
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

  // @BeforeInsert()
  // defaultDatetime() {
  //   this.workday = new Date();
  // }
}

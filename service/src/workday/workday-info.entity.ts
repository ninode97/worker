import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  ManyToOne,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Workday } from './workday.entity';

@Entity()
// @Unique(['user', 'workday'])
export class WorkdayInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Workday,
    workday => workday.workday,
    { primary: true, onDelete: 'CASCADE' },
  )
  workday: Workday;

  @ManyToOne(
    type => User,
    user => user.username,
    { primary: true, onDelete: 'CASCADE', eager: true },
  )
  user: User;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  endTime: Date;

  @Column({ default: false })
  isFinished: boolean;
}

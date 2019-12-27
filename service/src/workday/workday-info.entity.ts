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
  BeforeUpdate,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Workday } from './workday.entity';
import { Workplace } from 'src/workplace/workplace.entity';

@Entity()
// @Unique(['user', 'workday'])
export class WorkdayInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'started_at', type: 'timestamptz' })
  startTime: Date;

  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  endTime: Date;

  @ManyToOne(
    type => Workday,
    workday => workday.workday,
    { primary: true, onDelete: 'CASCADE', eager:true},
  )
  workday: Workday;

  @ManyToOne(
    type => User,
    user => user.username,
    { primary: true, onDelete: 'CASCADE', eager: true },
  )
  user: User;

  @ManyToOne(
    type => Workplace,
    workplace => workplace.workdayInfo,
    { primary: true, onDelete: 'CASCADE', eager: true },
  )
  workplace: Workplace;

  @BeforeUpdate()
  finishWorkday() {
    if (!this.endTime) {
      this.endTime = new Date();
    }
  }
}

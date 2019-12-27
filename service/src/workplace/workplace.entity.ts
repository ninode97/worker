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
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';
import { WorkdayInfo } from 'src/workday/workday-info.entity';

@Entity()
@Unique(['workplaceCode'])
export class Workplace extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'workplace_code' })
  workplaceCode: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }

  //FAILING
  // @ManyToOne(
  //   type => User,
  //   user => user,
  // )
  // userAdded: User;

  @OneToMany(
    type => WorkdayInfo,
    workdayInfo => workdayInfo.workday,
    {
      cascade: true,
    },
  )
  workdayInfo: WorkdayInfo[];
}

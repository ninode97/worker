import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

import { User } from '../user/user.entity';

@Entity()
export class PushToken extends BaseEntity {
  @PrimaryColumn()
  username: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false })
  token: string;

  //   @ManyToOne(
  //     type => User,
  //     user => user.username,
  //     {
  //       eager: true,
  //       onDelete: 'CASCADE',
  //     },
  //   )
  //   user: User;
}

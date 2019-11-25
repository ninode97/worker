import * as bcrypt from 'bcryptjs';
import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { Photo } from '../photo/photo.entity';
import { PhotoComments } from '../photo-comments/photo-comments.entity';
import { Workday } from '../workday/workday.entity';
import { WorkdayInfo } from '../workday/workday-info.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ default: false })
  isBlocked: boolean;

  @Column({ nullable: true })
  last4DigitsOfId: string;

  @ManyToOne(
    type => Role,
    role => role.role,
    { eager: true },
  ) // specify inverse side as a second parameter
  @JoinColumn()
  role: Role;

  @OneToMany(
    type => Photo,
    photo => photo.user,
    {},
  )
  photos: Photo[];

  @OneToMany(
    type => PhotoComments,
    photoComments => photoComments.user,
    {
      primary: false,
    },
  )
  photoComments: PhotoComments[];

  @OneToMany(
    type => WorkdayInfo,
    workdayInfo => workdayInfo.id,
    {
      primary: false,
    },
  )
  workdayInfos: WorkdayInfo[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

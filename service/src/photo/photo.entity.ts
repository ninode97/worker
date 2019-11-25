import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { PhotoComments } from '../photo-comments/photo-comments.entity';
import { SubmisionType } from './submision-type.enum';

@Entity()
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'added_at', type: 'timestamptz' })
  addedAt: Date;

  @Column()
  name: string;

  @Column()
  thumbnailPath: string;

  // @Column()
  // uri: string;

  // @Column()
  // country: string;

  // @Column()
  // city: string;

  @ManyToOne(type => User, user => user.username, { eager: true })
  user: User;

  @OneToMany(type => PhotoComments, photoComments => photoComments.photo, {
    eager: true,
  })
  photoComments: PhotoComments[];

  @Column()
  type: SubmisionType;
}

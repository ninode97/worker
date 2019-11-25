import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Photo } from '../photo/photo.entity';

@Entity()
export class PhotoComments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'added_at', type: 'timestamptz' })
  addedAt: Date;

  @Column({ default: 'Workplace photo' })
  message: string;

  @ManyToOne(
    type => User,
    user => user.username,
    {
      eager: true,
    },
  )
  user: User;
  @ManyToOne(type => Photo)
  photo: Photo;
}

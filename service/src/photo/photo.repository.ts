import { Repository, EntityRepository } from 'typeorm';
import { Photo } from './photo.entity';
import { SubmisionType } from './submision-type.enum';
import { PhotoComments } from 'src/photo-comments/photo-comments.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PhotoCommentsRepository } from '../photo-comments/photo-comments.repository';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async addPhoto(newPhoto: Photo) {
    try {
      const photo = await newPhoto.save();
      return photo;
    } catch (err) {
      throw new InternalServerErrorException("Couldn't add new photo...");
    }
  }
}

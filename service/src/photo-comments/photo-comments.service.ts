import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoComments } from './photo-comments.entity';
import { PhotoCommentsRepository } from './photo-comments.repository';
import { AddCommentDto } from './dto/add-comment.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Photo } from '../photo/photo.entity';
import { PhotoRepository } from '../photo/photo.repository';

@Injectable()
export class PhotoCommentsService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: PhotoRepository,
    @InjectRepository(PhotoComments)
    private photoCommentsRepository: PhotoCommentsRepository,
  ) { }

  async getComments(photo: Photo) {
    return this.photoCommentsRepository.find({ where: { photo } });
  }
  async addComment(user: User, addCommentDto: AddCommentDto) {
    const { photoId } = addCommentDto;
    const photo = await this.photoRepository.findOne({
      where: { id: photoId },
    });
    return this.photoCommentsRepository.addComment(user, addCommentDto, photo);
  }
}

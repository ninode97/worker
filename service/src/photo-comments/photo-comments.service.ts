import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoComments } from './photo-comments.entity';
import { PhotoCommentsRepository } from './photo-comments.repository';
import { AddCommentDto } from './dto/add-comment.dto';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Photo } from '../photo/photo.entity';
import { PhotoRepository } from '../photo/photo.repository';
import { PushtokenService } from 'src/pushtoken/pushtoken.service';
import * as moment from 'moment';

@Injectable()
export class PhotoCommentsService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: PhotoRepository,
    @InjectRepository(PhotoComments)
    private photoCommentsRepository: PhotoCommentsRepository,
    private readonly pushTokenService: PushtokenService,
  ) {}

  async getComments(photo: Photo) {
    return this.photoCommentsRepository.find({ where: { photo } });
  }
  async addComment(user: User, addCommentDto: AddCommentDto) {
    const { photoId } = addCommentDto;

    const photo = await this.photoRepository.findOne({
      where: { id: photoId },
    });
    let date = moment(photo.addedAt).format('YYYY/MM/DD');
    await this.photoCommentsRepository.addComment(user, addCommentDto, photo);
    if (user.username !== photo.user.username) {
      let users = Array.from(
        new Set(photo.photoComments.map(comment => comment.user.username)),
      );

      let name = `${user.firstName} ${user.lastName}`;
      let body = `${name} posted new comment on the ${name} photo [UPLOAD DATE: ${date}]`;

      users = users.filter(username => username !== user.username);

      this.pushTokenService.sendMessagesBatch(users, body, {});
    }
  }
}

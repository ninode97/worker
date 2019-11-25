import { Injectable } from '@nestjs/common';
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
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async addComment(user: User, addCommentDto: AddCommentDto) {
    const { photoId, comment } = addCommentDto;
    //console.log(addCommentDto);

    // console.log(user);
    const photo = await this.photoRepository.findOne({
      where: { id: photoId },
    });
    const newComment = new PhotoComments();
    newComment.addedAt = new Date();
    newComment.message = comment;
    newComment.photo = photo;
    newComment.user = user;

    newComment
      .save()
      .then(comment => {
        console.log(comment);
        photo.photoComments.push(comment);
        photo
          .save()
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        newComment.remove();
      });
  }
}

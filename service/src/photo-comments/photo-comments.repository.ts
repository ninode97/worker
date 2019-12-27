import { Repository, EntityRepository } from 'typeorm';
import { PhotoComments } from './photo-comments.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { Photo } from 'src/photo/photo.entity';

@EntityRepository(PhotoComments)
export class PhotoCommentsRepository extends Repository<PhotoComments> {
  async addComment(user: User, addCommentDto: AddCommentDto, photo: Photo) {
    const { comment } = addCommentDto;
    const newComment = new PhotoComments();
    newComment.addedAt = new Date();
    newComment.message = comment;
    newComment.photo = photo;
    newComment.user = user;
    newComment
      .save()
      .then(comment => {
        photo.photoComments.push(comment);
        photo
          .save()
          .then(res => {
            return res;
          })
          .catch(err => {
            throw new InternalServerErrorException("Couldn't add comment!");
          });
      })
      .catch(err => {
        console.log(err);
        newComment.remove();
      });
  }
}

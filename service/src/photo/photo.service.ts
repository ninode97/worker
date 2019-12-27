import { Injectable } from '@nestjs/common';
import { Photo } from './photo.entity';
import { PhotoComments } from '../photo-comments/photo-comments.entity';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { Between } from 'typeorm';
import { SubmisionType } from './submision-type.enum';
import { PhotoCommentsService } from '../photo-comments/photo-comments.service';

type SafePhotoComment = {
  addedAt: Date;
  message: string;
  user: {
    username: string;
  };
};

type PhotoListWithLinks = {
  username: string;
  id: number;
  addedAt: Date;
  name: string;
  photoComments: SafePhotoComment[];
  type: SubmisionType;
  links: {
    image: string;
    thumb: string;
  };
};

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: PhotoRepository,
    private photoCommentsService: PhotoCommentsService,
  ) {}

  private formatFirstMessage(type: SubmisionType) {
    if (type.toUpperCase() === 'START') {
      return 'Started work in new workplace';
    } else if (type.toUpperCase() === 'END') {
      return 'Ended work';
    } else {
      return 'Additional photo';
    }
  }
  async addPhoto(newPhoto: Photo, firstComment: string) {
    const photo = await this.photoRepository.addPhoto(newPhoto);
    let comment =
      firstComment && firstComment.length > 0 && firstComment !== 'null'
        ? firstComment
        : this.formatFirstMessage(photo.type);
    const c = await this.photoCommentsService.addComment(photo.user, {
      comment,
      username: photo.user.username,
      photoId: photo.id,
    });
    return photo;
  }

  async filterByDate(user: User, date: Date) {
    const yDate = new Date(date);
    yDate.setDate(yDate.getDate() + 1);
    const data = await this.photoRepository.find({
      where: {
        addedAt: Between(date, yDate),
        user: user,
      },
    });
    return this.generateResponseObjects(data);
  }

  private generateResponseObjects(data: Photo[]): PhotoListWithLinks[] {
    const formedData: PhotoListWithLinks[] = [];
    data.map(photo => {
      const date = photo.addedAt;
      let folderName = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
      const obj: PhotoListWithLinks = {
        username: photo.user.username,
        id: photo.id,
        addedAt: photo.addedAt,
        name: photo.name,
        photoComments: this.removeSecrets(photo.photoComments),
        type: photo.type,
        links: {
          image: `https://workero.site/api/images/${photo.user.username}/${folderName}/${photo.name}`,
          thumb: `https://workero.site/api/images/${photo.user.username}/${folderName}/${photo.thumbnailPath}`,
        },
      };
      formedData.push(obj);
    });
    return formedData;
  }

  private removeSecrets(photoComments: PhotoComments[]): SafePhotoComment[] {
    return photoComments.map((comment: PhotoComments, index) => {
      return {
        addedAt: comment.addedAt,
        message: comment.message,
        user: {
          username: comment.user.username,
        },
      };
    });
  }

  async getAllPhotosForDay(fromDate: Date) {
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 1);

    let photos = await this.photoRepository.find({
      where: { addedAt: Between(fromDate, toDate) },
      order: {
        addedAt: 'ASC',
      },
    });
    return this.generateResponseObjects(photos);
  }

  async filterUserPhotosBy(user: User, date: Date) {
    return this.filterByDate(user, date);
  }
}

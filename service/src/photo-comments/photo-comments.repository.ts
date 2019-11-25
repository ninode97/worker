import { Repository, EntityRepository } from 'typeorm';
import { PhotoComments } from './photo-comments.entity';

@EntityRepository(PhotoComments)
export class PhotoCommentsRepository extends Repository<PhotoComments> {}

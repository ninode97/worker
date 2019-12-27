import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AddCommentDto } from './dto/add-comment.dto';
import { PhotoCommentsService } from './photo-comments.service';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('photo-comments')
export class PhotoCommentsController {
  constructor(private photoCommentsService: PhotoCommentsService) { }
  @Post()
  addComment(@GetUser() user: User, @Body() addCommentDto: AddCommentDto) {
    this.photoCommentsService.addComment(user, addCommentDto);
  }
}

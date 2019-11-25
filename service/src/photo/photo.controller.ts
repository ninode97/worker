import {
  Controller,
  Post,
  Get,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  Param,
  Res,
  Header,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { moveFile, parseFormData } from '../utils';
import * as fs from 'fs';
import * as PATH from 'path';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { CommentBodyDto } from './dto/comment-body.dto';
import { PhotoService } from './photo.service';
import { PhotoCommentsService } from 'src/photo-comments/photo-comments.service';
import { Photo } from './photo.entity';
import * as moment from 'moment';
import { createReadStream } from 'fs';
import { UserService } from '../user/user.service';
import { ReportService } from '../report/report.service';
import { WorkdayService } from '../workday/workday.service';

const imageThumbnail = require('image-thumbnail');

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file, { encoding: 'base64' });
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString();
}

@UseGuards(AuthGuard('jwt'))
@Controller('photos')
export class PhotoController {
  constructor(
    private photoService: PhotoService,
    private photoCommentsService: PhotoCommentsService,
    private userService: UserService,
    private readonly reportService: ReportService,
    private readonly workdayService: WorkdayService,
  ) {}

  @Get('/:username/:date/:photoname')
  async getMe(@Param() params) {
    const { username, date, photoname } = params;
    const imagePath = `uploads/photos/${username}/${date}/${photoname}`;
    if (fs.existsSync(imagePath)) {
      const d = base64_encode(imagePath);
  
      return d;
    } else {
      throw new NotFoundException('Image was not found!');
    }
  }

  @Get('/:username/:date')
  async filterUserPhotosBy(@GetUser() user: User, @Param() params) {
    const { username } = params;
    console.log(params.date);
    const date = new Date(params.date);
    if (user.role.role !== 'admin') {
      throw new UnauthorizedException();
    }

    const selectedUser = await this.userService.getUserByUsername(username);
    if (!selectedUser.id) {
      throw new NotFoundException();
    }
    return this.photoService.filterUserPhotosBy(selectedUser, date);
  }

  @Get('/:date')
  getUserPhotosByDate(@GetUser() user: User, @Param() params) {
    const d = moment(new Date(params.date));
    if (user.role.role !== 'admin' && d.isValid()) {
      return this.photoService.filterByDate(user, new Date(d.toString()));
    } else {
      return this.photoService.getAllPhotosForDay(new Date(d.toString()));
    }
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadPhoto(
    @GetUser() user: User,
    @UploadedFile() file,
    @Body() commentBodyDto: CommentBodyDto,
  ) {
    const { filename, path } = file;
    const date = new Date();
    const dateFormat = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}`;
    const time = `${date.getUTCHours()}_${date.getUTCMinutes()}_${date.getMilliseconds()}`;
    const ext = `${PATH.extname(filename)}`;

    console.log(path);
    const destination = `uploads/photos/${user.username}/${dateFormat}`;

    console.log(`${destination}/${time}`);
    let options = { width: 250, height: 250, responseType: 'base64' };
    const targetPath = `${destination}/${time}`;

    try {
      const thumbnail = await imageThumbnail(path);
      fs.mkdirSync(destination, { recursive: true });
      fs.appendFileSync(`${destination}/${time}_thumb${ext}`, thumbnail);
      moveFile(path, `${destination}/${time}${ext}`);
      fs.unlinkSync(path);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(
        `Couldn't write image to server...`,
      );
    }

    const comment = parseFormData(commentBodyDto) as CommentBodyDto;
    const newPhoto = new Photo();
    newPhoto.addedAt = new Date();
    newPhoto.name = `${time}${ext}`;
    newPhoto.user = user;
    newPhoto.type = comment.submisionType;
    newPhoto.thumbnailPath = `${time}_thumb${ext}`;

    const photo = await this.photoService
      .addPhoto(newPhoto, comment.comment)
      .then(() =>
        this.reportService.example({
          username: user.username,
          addedAt: newPhoto.addedAt,
          photoPath: `${destination}/${time}${ext}`,
          photoType: `image/${ext}`,
          photoName: newPhoto.name,
        }),
      )
      .catch(err => console.log(err));

    const workday = await this.workdayService.createWorkday();

    const isWorkdayCreated = await this.workdayService.isWorkdayInfoCreated(
      user,
      workday,
    );

    if (!isWorkdayCreated) {
      const workdayInfo = await this.workdayService.createWorkdayInfo({
        user,
        workday,
      });
    }
    console.log(newPhoto.type);
    if (isWorkdayCreated && newPhoto.type.toLowerCase() === 'end') {
      console.log(`WORKS?`);
      await this.workdayService.updateWorkdayInfo({
        isFinished: true,
        user,
        workday,
      });
    }
  }
}

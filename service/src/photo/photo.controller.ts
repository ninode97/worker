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
  BadRequestException,
  UnprocessableEntityException,
  ForbiddenException,
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
import { PhotoBodyDto } from './dto/photo-body.dto';
import { PhotoService } from './photo.service';
import { PhotoCommentsService } from 'src/photo-comments/photo-comments.service';
import { Photo } from './photo.entity';
import * as moment from 'moment';
import { createReadStream } from 'fs';
import { UserService } from '../user/user.service';
import { ReportService } from '../report/report.service';
import { WorkdayService } from '../workday/workday.service';
import { WorkplaceService } from '../workplace/workplace.service';
import { WorkdayInfo } from 'src/workday/workday-info.entity';

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
    private readonly workplaceService: WorkplaceService,
  ) {}

  @Get('/:username/:date/:photoname')
  async getMe(@Param() params) {
    const { username, date, photoname } = params;
    const destination = PATH.join(
      __dirname,
      `../../public/images/${username}/${date}/${photoname}`,
    );
    if (fs.existsSync(destination)) {
      return `https://www.workero.site/api/images/${username}/${date}/${photoname}`;
    } else {
      throw new NotFoundException('Image was not found!');
    }
  }

  @Get('/:username/:date')
  async filterUserPhotosBy(@GetUser() user: User, @Param() params) {
    const { username } = params;
    const date = new Date(params.date);
    if (user.role.role !== 'admin') {
      throw new UnauthorizedException();
    }

    const selectedUser = await this.userService.getUserByUsername(username);
    if (!selectedUser.id) {
      throw new NotFoundException();
    }
    const data = await this.photoService.filterUserPhotosBy(selectedUser, date);
    console.log(data);
    return data;
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
        destination: './temp',
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
    @Body() photoBodyDto: PhotoBodyDto,
  ) {
    if (!file)
      throw new UnprocessableEntityException('You need to attach image!');

    const { filename, path } = file;

    const date = new Date();
    const dateFormat = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}`;
    const time = `${date.getUTCHours()}_${date.getUTCMinutes()}_${date.getMilliseconds()}`;
    const ext = `${PATH.extname(filename)}`;
    const destination = PATH.join(
      __dirname,
      `../../public/images/${user.username}/${dateFormat}`,
    );
    let options = { percentage: 25 };
    const targetPath = `${destination}/${time}`;

    try {
      const thumbnail = await imageThumbnail(path, options);
      fs.mkdirSync(destination, { recursive: true });
      fs.appendFileSync(`${destination}/${time}_thumb${ext}`, thumbnail);

      //MOVE FILE
      const source = fs.createReadStream(path);
      const dest = fs.createWriteStream(`${destination}/${time}${ext}`);
      source.pipe(dest);
      source.on('end', function() {
        /* copied */
      });
      source.on('error', function(err) {
        /* error */ console.log('Error while copying!');
      });
      // fs.unlinkSync(path);
    } catch (err) {
      throw new InternalServerErrorException(
        `Couldn't write image to server...`,
      );
    }

    //PHOTO ENTITY FORMATION
    const photoBody = parseFormData(photoBodyDto) as PhotoBodyDto;
    const newPhoto = new Photo();
    newPhoto.addedAt = new Date();
    newPhoto.name = `${time}${ext}`;
    newPhoto.user = user;
    newPhoto.type = photoBody.submisionType;

    newPhoto.thumbnailPath = `${time}_thumb${ext}`;

    // WORKDAY ENTITY
    const workday = await this.workdayService.createWorkday();
    const isWorkdayCreated = await this.workdayService.isWorkdayInfoCreated(
      user,
      workday,
    );

    if (newPhoto.type.toUpperCase() === 'START') {
      if (!isWorkdayCreated) {
        const workplace = await this.workplaceService.getWorkplaceByWorkplaceCode(
          photoBody.workplace,
          user,
        );
        const workdayInfo = await this.workdayService.createWorkdayInfo({
          user,
          workday,
          workplace,
        });
        const photo = await this.photoService.addPhoto(
          newPhoto,
          photoBody.comment,
        );

        if (!workplace || !workdayInfo || !photo) {
          fs.unlinkSync(`${destination}/${time}${ext}`);
          fs.unlinkSync(`${destination}/${time}_thumb${ext}`);
          photo.remove();
          photo.save();
          workdayInfo.remove();
          workdayInfo.save();
          workplace.remove();
          workplace.save();
          throw new BadRequestException(
            "Couldn't add photo... Please try again!",
          );
        } else {
          this.newUploadAlert(
            user,
            newPhoto,
            `${destination}/${time}${ext}`,
            `image/${ext}`,
            workdayInfo,
            photoBody.comment,
          );
          fs.unlinkSync(path);
        }
      } else {
        throw new ForbiddenException(
          'You must finish working in current workplace, before you can start work in another workplace',
        );
      }
    } else if (newPhoto.type.toUpperCase() === 'END' && isWorkdayCreated) {
      const photo = await this.photoService.addPhoto(
        newPhoto,
        photoBody.comment,
      );
      const workdayInfo = await this.workdayService.endWorkdayInfo(
        user,
        workday,
      );
      if (!photo || !workdayInfo) {
        fs.unlinkSync(`${destination}/${time}${ext}`);
        fs.unlinkSync(`${destination}/${time}_thumb${ext}`);
        photo.remove();
        photo.save();
        workdayInfo.remove();
        workdayInfo.save();
        throw new BadRequestException(
          "Couldn't add photo... Please try again!",
        );
      } else {
        this.newUploadAlert(
          user,
          newPhoto,
          `${destination}/${time}${ext}`,
          `image/${ext}`,
          workdayInfo,
          photoBody.comment,
        );
        fs.unlinkSync(path);
      }
    } else if (
      newPhoto.type.toUpperCase() === 'ADDITIONAL' &&
      isWorkdayCreated
    ) {
      const photo = await this.photoService.addPhoto(
        newPhoto,
        photoBody.comment,
      );
      const workdayInfo = await this.workdayService.getWorkdayInfo(user);

      if (!photo) {
        fs.unlinkSync(`${destination}/${time}${ext}`);
        fs.unlinkSync(`${destination}/${time}_thumb${ext}`);
        photo.remove();
        photo.save();
        throw new BadRequestException(
          "Couldn't add photo... Please try again!",
        );
      } else {
        // LOG
        // REMOVE TEMP PHOTO
        this.newUploadAlert(
          user,
          newPhoto,
          `${destination}/${time}${ext}`,
          `image/${ext}`,
          workdayInfo,
          photoBody.comment,
        );
        fs.unlinkSync(path);
      }
    } else {
      fs.unlinkSync(path);
      throw new BadRequestException('Invalid submission type!');
    }

    console.log(path);
    console.log(fs.existsSync(path));
  }

  private newUploadAlert(
    user: User,
    newPhoto: Photo,
    destination: string,
    photoType: string,
    workdayInfo: WorkdayInfo,
    comment: string,
  ) {
    this.reportService.uploadPhotoAlert(
      {
        username: user.username,
        addedAt: newPhoto.addedAt,
        photoPath: destination,
        photoType: photoType,
        photoName: newPhoto.name,
        submisionType: newPhoto.type,
        comment: comment,
      },
      user,
      workdayInfo,
    );
  }
}

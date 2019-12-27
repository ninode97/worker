import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { PhotoUploadReportDto } from './dto/photo-upload.dto';
import { SubmisionType } from 'src/photo/submision-type.enum';
import { User } from 'src/user/user.entity';
import { WorkdayInfo } from 'src/workday/workday-info.entity';
import * as moment from 'moment';

@Injectable()
export class ReportService {
  private readonly transporter;
  private readonly mailOptions;

  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'djangotestfulservice',
        pass: 'babatukas12',
      },
    });
  }

  private formatFirstMessage(type: string) {
    if (type.toUpperCase() === 'START') {
      return 'Started work in new workplace';
    } else if (type.toUpperCase() === 'END') {
      return 'Ended work';
    } else {
      return 'Additional photo';
    }
  }

  private formatSubject(type: string, username: string) {
    switch (type.toUpperCase()) {
      case SubmisionType.START: {
        return `Worker ${username} started work.`;
      }
      case SubmisionType.ADDITIONAL: {
        return `Worker ${username} uploaded additional photo.`;
      }
      case SubmisionType.END: {
        return `Worker ${username} ended work.`;
      }
      default: {
        return `Worker ${username} uploaded new photo.`;
      }
    }
  }
  private formatTime(time) {
    if (time.toString().length < 2) {
      return `0${time}`;
    }
    return time;
  }

  private calculateTime = (time1, time2) => {
    const start_date = moment(time1, 'YYYY-MM-DD HH:mm:ss');
    const end_date = moment(time2, 'YYYY-MM-DD HH:mm:ss');
    const x = moment.duration(end_date.diff(start_date)).asMilliseconds();
    const seconds = moment.duration(x).seconds();
    const minutes = moment.duration(x).minutes();
    const hours = Math.trunc(moment.duration(x).asHours());

    return `${this.formatTime(hours)}:${this.formatTime(minutes)}`;
  };
  private generateAdditionalPhotoTemplate(
    user: User,
    workdayInfo: WorkdayInfo,
    comment: string,
  ) {
    return `
    <div>
      <p><em>User - <strong>${user.username}</strong> uploaded addition photo</em></p>
      <p><strong>Start time: </strong>${workdayInfo.startTime}</p>
      <p><strong>Workplace:</strong>${workdayInfo.workplace.workplaceCode}</p>
      <p><strong>Comment:</strong>${comment}</p>
    </div>
    `;
  }
  private generateStartWorkTemplate(
    user: User,
    workdayInfo: WorkdayInfo,
    comment: string,
  ) {
    return `
    <div>
      <p><em>User - <strong>${user.username}</strong> started work!</em></p>
      <p><strong>Start time: </strong>${workdayInfo.startTime}</p>
      <p><strong>Workplace:</strong>${workdayInfo.workplace.workplaceCode}</p>
      <p><strong>Comment:</strong>${comment}</p>
    </div>
    `;
  }
  private generateEndWorkTemplate(
    user: User,
    workdayInfo: WorkdayInfo,
    comment: string,
  ) {
    return `
    <div>
      <p><em>User - <strong>${user.username}</strong> ended work!</em></p>
      <p><strong>Start time: </strong>${workdayInfo.startTime}</p>
      <p><strong>End time: </strong>${workdayInfo.endTime}</p>
      <p><strong>Workplace:</strong>${workdayInfo.workplace.workplaceCode}</p>
      <p><strong>Hours Worked:</strong>${this.calculateTime(
        workdayInfo.startTime,
        workdayInfo.endTime,
      )}</p>
      <p><strong>Comment:</strong>${comment}</p>
    </div>
    `;
  }

  private generateTemplate(
    type: string,
    user: User,
    workdayInfo: WorkdayInfo,
    comment: string,
  ) {
    comment = comment === 'null' ? this.formatFirstMessage(type) : comment;

    if (type.toUpperCase() === SubmisionType.START) {
      return this.generateStartWorkTemplate(user, workdayInfo, comment);
    } else if (type.toUpperCase() === SubmisionType.END) {
      return this.generateEndWorkTemplate(user, workdayInfo, comment);
    } else if (type.toUpperCase() === SubmisionType.ADDITIONAL) {
      return this.generateAdditionalPhotoTemplate(user, workdayInfo, comment);
    } else {
      return `
      <div>Photo was uploaded by: ${user.username}</div>
      `;
    }
  }
  public uploadPhotoAlert(
    photoUploadDto: PhotoUploadReportDto,
    user: User,
    workdayInfo: WorkdayInfo,
  ) {
    const {
      username,
      addedAt,
      photoPath,
      photoType,
      photoName,
      submisionType,
      comment,
    } = photoUploadDto;

    let mailOptions = {
      // should be replaced with real recipient's account
      to: 'workerosite@gmail.com',
      from: 'reporter@workero.site',
      subject: this.formatSubject(submisionType, username),
      html: this.generateTemplate(submisionType, user, workdayInfo, comment),
      attachments: [
        {
          filename: photoName,
          path: photoPath,
          contentType: photoType,
        },
      ],
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new InternalServerErrorException("Couldn't send an email...");
      } else {
        console.log(info);
      }
      // console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

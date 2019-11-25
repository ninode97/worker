import { Injectable } from '@nestjs/common';
import * as nodeMailer from 'nodemailer';
import { PhotoUploadReportDto } from './dto/photo-upload.dto';

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

  public example(photoUploadDto: PhotoUploadReportDto) {
    const {
      username,
      addedAt,
      photoPath,
      photoType,
      photoName,
    } = photoUploadDto;

    let mailOptions = {
      // should be replaced with real recipient's account
      to: 'lukis0300@gmail.com',
      from: 'reporter@workero.site',
      subject: `${username} uploaded photo`,
      html: `
        <div style="display:flex'; flex-direction:column">
          <h1>New Photo was uploaded!</h1>
          <p>Uploaded at: ${addedAt}</p>
        </div>
      `,
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
        console.log(error);
      } else {
        console.log(info);
      }
      // console.log('Message %s sent: %s', info.messageId, info.response);
    });
  }
}

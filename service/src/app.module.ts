import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoCommentsModule } from './photo-comments/photo-comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { ReportModule } from './report/report.module';
import { WorkdayModule } from './workday/workday.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          auth: { user: 'djangotestfulservice', pass: 'babatukas12' },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates/uploadedPhoto.html',
          adapter: new HandlebarsAdapter(), // or new PugAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RoleModule,
    PhotoModule,
    PhotoCommentsModule,
    ReportModule,
    WorkdayModule,
  ],
})
export class AppModule {}

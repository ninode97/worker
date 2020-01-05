import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { PhotoModule } from './photo/photo.module';
import { PhotoCommentsModule } from './photo-comments/photo-comments.module';
import { MulterModule } from '@nestjs/platform-express';
import { ReportModule } from './report/report.module';
import { WorkdayModule } from './workday/workday.module';
import { WorkplaceModule } from './workplace/workplace.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PushtokenModule } from './pushtoken/pushtoken.module';

@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    RoleModule,
    PhotoModule,
    PhotoCommentsModule,
    ReportModule,
    WorkdayModule,
    WorkplaceModule,
    PushtokenModule,
  ],
})
export class AppModule {}

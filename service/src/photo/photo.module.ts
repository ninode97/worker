import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { PhotoCommentsModule } from '../photo-comments/photo-comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoRepository } from './photo.repository';
import { ReportModule } from '../report/report.module';
import { UserModule } from '../user/user.module';
import { WorkdayModule } from '../workday/workday.module';
import { WorkplaceModule } from '../workplace/workplace.module';

@Module({
  providers: [PhotoService],
  controllers: [PhotoController],
  imports: [
    TypeOrmModule.forFeature([PhotoRepository]),
    PhotoCommentsModule,
    ReportModule,
    UserModule,
    WorkdayModule,
    WorkplaceModule,
  ],
  exports: [TypeOrmModule, PhotoService],
})
export class PhotoModule {}

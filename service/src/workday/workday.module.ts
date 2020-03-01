import { Module } from '@nestjs/common';
import { WorkdayController } from './workday.controller';
import { WorkdayService } from './workday.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkdayRepository } from './workday.repository';
import { WorkdayInfoRepository } from './workday-info.repository';
import { UserModule } from 'src/user/user.module';
import { WorkplaceModule } from 'src/workplace/workplace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkdayRepository, WorkdayInfoRepository]),
    UserModule,
    WorkplaceModule,
  ],
  controllers: [WorkdayController],
  providers: [WorkdayService],
  exports: [TypeOrmModule, WorkdayService],
})
export class WorkdayModule {}

import { Module } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { WorkplaceController } from './workplace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkplaceRepository } from './workplace.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WorkplaceRepository])],
  providers: [WorkplaceService],
  controllers: [WorkplaceController],
  exports: [TypeOrmModule, WorkplaceService],
})
export class WorkplaceModule {}

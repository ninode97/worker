import { Module } from '@nestjs/common';
import { ReportService } from './report.service';

@Module({
  exports: [ReportService],
  providers: [ReportService],
})
export class ReportModule {}

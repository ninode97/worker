import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkdayRepository } from './workday.repository';
import { WorkdayInfoRepository } from './workday-info.repository';
import { WorkdayOptions } from './interfaces/workday-options.interface';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { Workday } from './workday.entity';
import { UpdateWorkdayInfoDto } from './dto/update-workday-info.dto';
import { CreateWorkdayInfoDto } from './dto/create-workday-info.dto';
import { User } from '../user/user.entity';

@Injectable()
export class WorkdayService {
  constructor(
    @InjectRepository(WorkdayRepository)
    private readonly workdayRepository: WorkdayRepository,
    @InjectRepository(WorkdayInfoRepository)
    private readonly workdayInfoRepository: WorkdayInfoRepository,
  ) {}

  startWorkday(date, user) {}

  endWorkday(date, user) {}

  getWorkdayByUsername(username) {}

  async getWorkdays(options: WorkdayOptions) {
    return this.workdayRepository.getWorkdays(options);
  }

  async createWorkday(): Promise<Workday> {
    return this.workdayRepository.createWorkday();
  }

  async getWorkersWorkdayInfo(workdayInfoOptions: WorkdayInfoOptions) {
    return this.workdayInfoRepository.getWorkersWorkdayInfo(workdayInfoOptions);
  }

  async createWorkdayInfo(createWorkdayInfoDto: CreateWorkdayInfoDto) {
    return this.workdayInfoRepository.createWorkdayInfo(createWorkdayInfoDto);
  }

  async updateWorkdayInfo(updateWorkdayInfoDto: UpdateWorkdayInfoDto) {
    return this.workdayInfoRepository.updateWorkdayInfo(updateWorkdayInfoDto);
  }

  async isWorkdayInfoCreated(user: User, workday: Workday) {
    return this.workdayInfoRepository.isWorkdayInfoCreated(user, workday);
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { Workday } from './workday.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { WorkdayOptions } from './interfaces/workday-options.interface';

@EntityRepository(Workday)
export class WorkdayRepository extends Repository<Workday> {
  async getWorkdays(options: WorkdayOptions) {
    return this.find({ where: options });
  }

  async createWorkday() {
    let workday = new Workday();
    workday.workday = new Date();
    try {
      await workday.save();
    } catch (error) {
      if (error.code === '23505') {
        console.log(`Exists, just return workday!`)
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    } finally {
      const data =  await this.findOne({ where: { workday: workday.workday } });;
      console.log(data);
      return data;
    }
  }
}

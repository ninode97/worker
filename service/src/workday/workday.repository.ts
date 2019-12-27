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

  async getWorkday(workday: string) {
    const d = new Date(workday);
    console.log(d);
    const data = await this.findOne({ where: { workday: d } });
    console.log(data);
    return data;
  }

  async createWorkday() {
    //FIX IT!
    // let workday = new Workday();
    // workday.workday = new Date();
    const date = new Date();
    let workday = await this.findOne({ where: { workday: date } });

    try {
      if (workday) {
        return workday;
      } else {
        workday = new Workday();
        workday.workday = date;
        workday = await workday.save();
        return workday;
      }
    } catch (error) {
      if (error.code === '23505') {
        console.log(`Exists, just return workday!`);
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    } finally {
      const data = await this.findOne({ where: { workday: workday.workday } });
      return data;
    }
  }

  async ensureMonthFirstDay(workday: string) {
    const w = await this.findOne({ where: { workday: new Date(workday) } });
    if (w) {
      return w;
    } else {
      try {
        const newWorkday = new Workday();
        const date = new Date(workday);
        newWorkday.workday = date;
        console.log(newWorkday);
        return await newWorkday.save();
      } catch (error) {
        if (error.code === '23505') {
          return await this.findOne({ where: { workday: new Date(workday) } });
        } else {
          console.log(error);
          throw new InternalServerErrorException(
            "Couldn't save the workday entity",
          );
        }
      }
    }
  }
}

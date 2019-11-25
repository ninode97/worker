import { EntityRepository, Repository } from 'typeorm';
import { WorkdayInfo } from './workday-info.entity';
import { WorkdayInfoOptions } from './interfaces/workday-info-options.interface';
import { CreateWorkdayInfoDto } from './dto/create-workday-info.dto';
import { UpdateWorkdayInfoDto } from './dto/update-workday-info.dto';
import { User } from '../user/user.entity';
import { Workday } from './workday.entity';

@EntityRepository(WorkdayInfo)
export class WorkdayInfoRepository extends Repository<WorkdayInfo> {
  async getWorkersWorkdayInfo(workdayInfoOptions: WorkdayInfoOptions) {
    const data = await this.find({ where: workdayInfoOptions });

    return data.map(record => {
      delete record.user.password;
      delete record.user.salt;
      delete record.user.role.createdAt;
      delete record.user.role.accessLevel;
      delete record.user.role.id;

      console.error('**********************');
      console.error(record);
      console.error('**********************');
      return record;
    });
  }

  async createWorkdayInfo(createWorkdayInfoDto: CreateWorkdayInfoDto) {
    const workdayInfo = new WorkdayInfo();
    workdayInfo.startTime = new Date();
    workdayInfo.user = createWorkdayInfoDto.user;
    workdayInfo.workday = createWorkdayInfoDto.workday;

    try {
      workdayInfo.save();
    } catch (err) {
      console.log(err.code);
    }
  }

  async updateWorkdayInfo(updateWorkdayInfoDto: UpdateWorkdayInfoDto) {
    console.log(updateWorkdayInfoDto);
    const workdayInfo = await this.findOne({
      where: {
        user: updateWorkdayInfoDto.user,
        workday: updateWorkdayInfoDto.workday,
      },
    });
    console.log(`DDDDDDDDEBUUUUUUUUUUG`);
    workdayInfo.isFinished = true;
    workdayInfo.endTime = new Date();
    workdayInfo.user = updateWorkdayInfoDto.user;
    workdayInfo.workday = updateWorkdayInfoDto.workday;

    console.log(workdayInfo);

    try {
      await workdayInfo.save();
      console.log(workdayInfo);
    } catch (err) {
      console.log(err);
    }
  }

  async isWorkdayInfoCreated(user: User, workday: Workday) {
    const data = await this.find({ where: { workday, user } });
    return data.length > 0 ? true : false;
  }
}

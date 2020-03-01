import { Injectable } from '@nestjs/common';
import { WorkplaceRepository } from './workplace.repository';
import { WorkplaceDto } from './dto/workplace.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class WorkplaceService {
  constructor(private readonly workplaceRepository: WorkplaceRepository) {}

  async getWorkplaces(workplaceDto: WorkplaceDto) {
    const workplaces = await this.workplaceRepository.find();
    return workplaces.map(workplace => {
      return { workplaceCode: workplace.workplaceCode, id: workplace.id };
    });
  }

  async addNewWorkplace(workplaceDto: WorkplaceDto, user: User) {
    return this.workplaceRepository.addNewWorkplace(workplaceDto, user);
  }

  async updateWorkplaceCode(
    id: number,
    workplaceDto: WorkplaceDto,
    user: User,
  ) {
    // update workplace code
    return this.workplaceRepository.updateWorkplaceCode(id, workplaceDto, user);
  }

  // For external usage
  async getWorkplaceByWorkplaceCode(workplaceCode: string, user: User) {
    return this.workplaceRepository.getWorkplaceByWorkplaceCode(
      workplaceCode,
      user,
    );
  }

  async getWorkplaceV2(workplaceCode: string) {
    return this.workplaceRepository.getWorkplace(workplaceCode);
  }
}

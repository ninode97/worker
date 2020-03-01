import { EntityRepository, Repository } from 'typeorm';
import { Workplace } from './workplace.entity';
import { WorkplaceDto } from './dto/workplace.dto';
import { User } from 'src/user/user.entity';
import {
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';

@EntityRepository(Workplace)
export class WorkplaceRepository extends Repository<Workplace> {
  async getWorkplace(workplaceCode: string) {
    return this.findOne({ where: { workplaceCode } });
  }
  async getWorkplaceByWorkplaceCode(workplaceCode: string, user: User) {
    let workplace = await this.findOne({ where: { workplaceCode } });

    if (workplaceCode.length <= 4) {
      throw new NotAcceptableException(
        'Workplace code must be longer than 4 characters',
      );
    }

    if (workplace) {
      return this.findOne({ where: { workplaceCode } });
    } else {
      try {
        let n = new Workplace();
        n.workplaceCode = workplaceCode;
        //   n.userAdded = user;
        n = await n.save();

        return n;
      } catch (err) {
        throw new InternalServerErrorException(`Couldn't fetch the Workplace`);
      }
    }
  }
  async addNewWorkplace(workplaceDto: WorkplaceDto, user: User) {
    const { workplaceCode } = workplaceDto;
    const workplace = await this.findOne({ where: { workplaceCode } });

    if (!workplace) {
      let newWorkplace = new Workplace();
      // newWorkplace.userAdded = user;
      newWorkplace.workplaceCode = workplaceCode;
      try {
        newWorkplace = await newWorkplace.save();
        return {
          id: newWorkplace.id,
          workplaceCode: newWorkplace.workplaceCode,
        };
      } catch (err) {
        if (err.code === '23502') {
          throw new NotFoundException('There us no such user...');
        } else {
          throw new InternalServerErrorException(
            'Something went wrong, while adding new workplace...',
          );
        }
      }
    } else {
      throw new ConflictException(
        `${workplace.workplaceCode} is already in database!`,
      );
    }
  }

  async updateWorkplaceCode(
    id: number,
    workplaceDto: WorkplaceDto,
    user: User,
  ) {
    const { workplaceCode } = workplaceDto;
    let workplace = await this.findOne({ where: { id } });
    if (workplace) {
      if (workplace.workplaceCode === workplaceCode) {
      } else {
        try {
          // workplace.userAdded = user;
          workplace.workplaceCode = workplaceCode;
          workplace = await workplace.save();
          return { id: workplace.id, workplaceCode: workplace.workplaceCode };
        } catch (err) {
          if (err.code === '23502') {
            throw new NotFoundException('There us no such user...');
          } else if (err.code === '23505') {
            throw new ConflictException(
              `Workplace code: "${workplace.workplaceCode}" is already in database...`,
            );
          } else {
            throw new InternalServerErrorException(
              'Something went wrong, while updating new workplace...',
            );
          }
        }
      }
    } else {
      throw new NotFoundException(`There is no such workplace with id: ${id}`);
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { WorkplaceDto } from './dto/workplace.dto';
import { WorkplaceService } from './workplace.service';
import { User } from '../user/user.entity';
import { GetUser } from '../user/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('workplace')
export class WorkplaceController {
  constructor(private readonly workplaceService: WorkplaceService) {}
  @Get()
  getWorkplaces() {
    return this.workplaceService.getWorkplaces(new WorkplaceDto());
  }

  @Get('v2')
  async getWorkplacesV2() {
    const workplaces = await this.workplaceService.getWorkplaces(
      new WorkplaceDto(),
    );
    return workplaces.map(workplace => ({
      name: workplace.workplaceCode,
    }));
  }

  @Post('')
  addNewWorkplace(
    @GetUser() user: User,
    @Body(ValidationPipe) workplaceDto: WorkplaceDto,
  ) {
    return this.workplaceService.addNewWorkplace(workplaceDto, user);
  }

  @Put('/:workplaceId')
  updateWorkplaceCode(
    @GetUser() user: User,
    @Body(ValidationPipe) workplaceDto: WorkplaceDto,
    @Param('workplaceId') id,
  ) {
    return this.workplaceService.updateWorkplaceCode(id, workplaceDto, user);
  }
}

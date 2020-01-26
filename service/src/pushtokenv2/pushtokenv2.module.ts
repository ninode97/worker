import { Module } from '@nestjs/common';
import { Pushtokenv2Service } from './pushtokenv2.service';

@Module({
  providers: [Pushtokenv2Service]
})
export class Pushtokenv2Module {}

import { Module, HttpModule } from '@nestjs/common';
import { PushtokenService } from './pushtoken.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushTokenRepository } from './pushtoken.repository';
import { ExpoHelper } from './expo.helper';

@Module({
  imports: [TypeOrmModule.forFeature([PushTokenRepository]), HttpModule],
  providers: [PushtokenService, ExpoHelper],
  exports: [TypeOrmModule, PushtokenService],
})
export class PushtokenModule {}

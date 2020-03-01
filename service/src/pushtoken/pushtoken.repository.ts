import { Repository, EntityRepository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/user.entity';
import { PushToken } from './pushtoken.entity';

@EntityRepository(PushToken)
export class PushTokenRepository extends Repository<PushToken> {
  async addToken(user: User, pushtoken: string) {}

  async getToken() {
    return 'OOK!';
  }

  async getTokens() {}

  async removeToken() {}
}

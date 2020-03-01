import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '141.136.44.79',
  port: 5432,
  username: 'admin',
  password: 'sdYUOOPzx1223!!232xzcsd',
  database: 'test',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { PushtokenModule } from 'src/pushtoken/pushtoken.module';

const jwtConfig = {
  // expiresIn: '900s',
  expiresIn: '5h',
  secret: 'OIOPZX1223asdzxcccx!@#@Czxz',
};

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    UserModule,
    RoleModule,
    PushtokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

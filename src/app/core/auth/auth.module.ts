import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
//import { ConfigurationService } from '../configuration/services/configuration.service';
import { UserModule } from '../user/user.module';
import { ConfigService, ConfigModule } from '@devon4node/config';
import { Config } from '../../shared/model/config/config.model';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<Config>) => config.values.jwtConfig,
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, PassportModule, UserModule],
  controllers: [AuthController],
})
export class AuthModule {}

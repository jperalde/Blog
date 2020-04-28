import { ClassSerializerInterceptor } from '@devon4node/common/serializer';
import { ConfigModule, ConfigService } from '@devon4node/config';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { BusinessLogicFilter } from '../shared/filters/business-logic.filter';
import { WinstonLogger } from '../shared/logger/winston.logger';
import { Config } from '../shared/model/config/config.model';
import { AuthModule } from './auth/auth.module';

@Global()
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      configPrefix: 'devon4node',
      configType: Config,
      configDir: join(__dirname, '../../config'),
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService<Config>) => {
        return ConfigService.values.graphqlConfig;
      },
      inject: [ConfigService],
    }),
    //MongooseModule.forRootAsync({
    //  imports: [ConfigModule],
    //  useFactory: (ConfigService: ConfigService<Config>) => {
    //    return ConfigService.values.mongooseConfig;
    //  },
    //  inject: [ConfigService],
    //}),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: BusinessLogicFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    WinstonLogger,
  ],
  exports: [ConfigModule, WinstonLogger],
})
export class CoreModule {}

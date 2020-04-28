import { BaseConfig } from '@devon4node/config';
import { GqlModuleOptions } from '@nestjs/graphql';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsIn, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class LoggerConfiguration {
  @IsOptional()
  @IsString()
  @IsIn(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'])
  loggerLevel?: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
  @IsOptional()
  @IsString()
  generalLogFile?: string;
  @IsOptional()
  @IsString()
  errorLogFile?: string;
  @IsOptional()
  @IsBoolean()
  console?: boolean;
}
export class Config extends BaseConfig {
  @IsOptional()
  @ValidateNested()
  @Type(() => LoggerConfiguration)
  loggerConfig?: LoggerConfiguration;
  @IsDefined()
  @IsNotEmptyObject()
  jwtConfig!: JwtModuleOptions;
  mongooseConfig!: MongooseModuleOptions;
  graphqlConfig!: GqlModuleOptions;
}

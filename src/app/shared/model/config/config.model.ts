import { BaseConfig } from '@devon4node/config';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import { JwtModuleOptions } from '@nestjs/jwt';

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
}

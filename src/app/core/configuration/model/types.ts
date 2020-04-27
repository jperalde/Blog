import { JwtModuleOptions } from '@nestjs/jwt';
import { ConnectionOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IConfig {
  isDev: boolean;
  host: string;
  port: number;
  clientUrl: string;
  globalPrefix: string;
  database: ConnectionOptions;
  jwtConfig: JwtModuleOptions;
}

import { Config } from '../app/shared/model/config/config.model';

const def: Config = {
  isDev: true,
  host: 'localhost',
  port: 3000,
  clientUrl: 'localhost:4200',
  globalPrefix: 'v1',
  loggerConfig: {
    console: false,
    loggerLevel: 'info',
  },
  jwtConfig: { secret: 'SECRET', signOptions: { expiresIn: '24h' } },
};

export default def;

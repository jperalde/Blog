import { Config } from '../app/shared/model/config/config.model';

const def: Config = {
  isDev: true,
  host: 'localhost',
  port: 3000,
  clientUrl: 'localhost:4200',
  globalPrefix: 'v1',
  loggerConfig: {
    console: true,
    errorLogFile: './logs/error.log',
    generalLogFile: './logs/general.log',
    loggerLevel: 'info',
  },
  jwtConfig: { secret: 'SECRET', signOptions: { expiresIn: '24h' } },
  graphqlConfig: { autoSchemaFile: true, context: ({ req }): { req: any } => ({ req }) },
  mongooseConfig: {
    uri: 'mongodb://root:example@localhost:27017',
  },
};

export default def;

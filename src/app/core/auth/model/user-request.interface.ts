import { Request } from 'express';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IUserRequest extends Request {
  user: any;
}

export type UserRequest = IUserRequest;

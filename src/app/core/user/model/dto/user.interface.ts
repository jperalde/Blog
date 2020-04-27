import { Document } from 'mongoose';

export interface UserModel extends Document {
  readonly username: string;
  readonly password: string;
  readonly role: number;
}

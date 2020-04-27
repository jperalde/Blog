import { User } from '../user.model';

export class UserPayload implements Pick<User, 'username' | 'role'> {
  username!: string;
  role!: number;
}

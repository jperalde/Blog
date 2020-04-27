import { Injectable, Inject } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { Model } from 'mongoose';
import { roles } from '../../auth/model/roles.enum';
import { NewUserInput } from '../model/dto/new-user.input';
import { User } from '../model/user.model';
import { UserModel } from '../model/dto/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel')
    private userModel: Model<UserModel>,
  ) {}

  async findOne(username: string): Promise<User> {
    const user = await this.userModel.find({ username }).exec();
    console.log(user);
    return user[0];
  }

  async registerUser(user: NewUserInput): Promise<User> {
    const actualUser = await this.findOne(user.username!);

    if (actualUser) {
      throw new Error('User already exists');
    }

    const salt = await genSalt(12);
    const password = await hash(user.password, salt);
    const role = roles.USER;
    const username = user.username;

    const createdUser = new this.userModel({ username, password, role });
    await createdUser.save();
    return { username, password, role };
  }
}

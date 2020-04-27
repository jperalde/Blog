import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from './model/user.model';
import { UserService } from './services/user.service';
import { NewUserInput } from './model/dto/new-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private usersService: UserService) {}

  @Mutation(() => User)
  async newUser(@Args('newUserInput') newUserInput: NewUserInput): Promise<User> {
    const user = await this.usersService.registerUser(newUserInput);
    return user;
  }
}

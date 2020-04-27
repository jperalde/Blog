import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '../../user/model/user.model';
import { LoginDTO } from '../model/login.dto';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const user = await this.usersService.findOne(username);
    //const salt = await genSalt(12);
    //const password = await hash(pass, salt);
    if (user && (await compare(pass, user.password!))) {
      return { username: user.username, role: user.role } as User;
    }
    return undefined;
  }

  async login(user: LoginDTO): Promise<string> {
    const payload = await this.validateUser(user.username!, user.password!);

    if (!payload) {
      throw new UnauthorizedException('Wrong username or password');
    }

    return this.jwtService.sign(payload);
  }

  async register(user: User): Promise<User> {
    return await this.usersService.registerUser(user);
  }
}

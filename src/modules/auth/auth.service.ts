import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      return false;
    }

    const match = await this.comparePassword(pass, user.password);

    if (!match) {
      return false;
    }

    return true;
  }

  public async login(user) {
    const isValid = await this.validateUser(user.email, user.password);
    if (!isValid) {
      return null;
    }
    const token = await this.generateToken(user);
    const userTmp = await this.userService.getByEmail(user.email);
    const { firstName, lastName, email, id } = userTmp;
    return {
      token,
      firstName,
      lastName,
      email,
      id,
    };
  }

  public async create(user) {
    const pass = await this.hashPassword(user.password);

    await this.userService.create({
      ...user,
      password: pass,
    });

    const newUser = await this.userService.getByEmail(user.email);
    const token = await this.generateToken(newUser.toJSON());

    return {
      id: newUser.id,
      lastName: newUser.lastName,
      firstName: newUser.firstName,
      email: newUser.email,
      token,
    };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}

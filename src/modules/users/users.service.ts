import { Injectable, Inject } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { USER_REPOSITORY } from '../../core/constants';

import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async get(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async create(user: UserDto): Promise<void> {
    await User.create(user);
  }

  async update(id: number, payload: UserDto): Promise<User> {
    const user = await User.findByPk(id);
    for (const key in payload) {
      if (key === 'password') {
        user[key] = bcrypt.hashSync(payload[key], 8);
        await user.save();
        break;
      }
      user[key] = payload[key];
      await user.save();
    }
    await user.reload();
    return user;
  }

  async delete(id: number): Promise<boolean> {
    const user = await User.findByPk(id);
    await user.destroy();
    return true;
  }
}

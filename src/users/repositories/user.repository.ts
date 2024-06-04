import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { Users } from '../models/users.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(offset: number, limit: number): Promise<Users> {
    const { rows, count } = await this.userModel.findAndCountAll({
      offset,
      limit,
    });
    return { users: rows, count: count };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async create(user: User): Promise<User> {
    console.log('USER ···· ', user);

    return this.userModel.create(user);
  }
}

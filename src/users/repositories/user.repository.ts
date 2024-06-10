import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/database/User.model';
import { Users } from '../models/business/Users.model';

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
    return this.userModel.create(user);
  }
}

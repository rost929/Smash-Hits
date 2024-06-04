import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { UsersResponseDto } from '../dtos/UsersResponse.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(page: number, limit: number): Promise<UsersResponseDto> {
    const offset = (page - 1) * limit;

    const users = await this.userRepository.findAll(offset, limit);

    const totalPages = Math.ceil(users.count / limit);
    const currentPage = Math.floor(offset / limit) + 1;
    return {
      users: users.users,
      totalItems: users.count,
      totalPages,
      currentPage,
    };
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user: User = await this.userRepository.findByEmail(email);
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
      };
    }
    return;
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser(newUser: User): Promise<void> {
    const hashedPassword = await this.hashPassword(newUser.password);
    newUser.password = hashedPassword;
    await this.userRepository.create(newUser);
  }
}

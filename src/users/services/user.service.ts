import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findAll(): Promise<UserDto[]> {
        const users: User[] = await this.userRepository.findAll();
        return users.map(user => ({
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password
        }));
    }

    async findByEmail(email : string): Promise<UserDto> {
        const user: User = await this.userRepository.findByEmail(email);
        if (user) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password
            };
        }
        return;
    }

    async hashPassword (password: string) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    };

    async createUser(newUser) : Promise<void> {
        const hashedPassword = await this.hashPassword(newUser.password);
        newUser.password = hashedPassword;
        await this.userRepository.create(newUser);
    }
}

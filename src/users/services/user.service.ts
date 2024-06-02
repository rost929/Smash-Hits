import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async findAll(): Promise<UserDto[]> {
        const users: User[] = await this.userRepository.findAll();
        return users.map(user => ({
            id: user.id,
            username: user.username,
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
                username: user.username,
                email: user.email,
                name: user.name,
                password: user.password
            };
        }
        return;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findByEmail(email: string): Promise<User> {
        return this.userModel.findOne(
            { where: {
                email
            }}
        );
    }
}

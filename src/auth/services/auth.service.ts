import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../users/services/user.service';
import { User } from '../../users/models/user.model';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    async login(user: User) {
        const isValidUser = await this.validateUser(user.email, user.password);
        if (isValidUser) return this.generateJWT(user);
        return;
    }

    private async validateUser(email: string, password: string): Promise<boolean> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) return true;
        }
        return false;
    }

    private async generateJWT(user: User) {
        return {
            access_token: this.jwtService.sign({ 
                username: user.username, 
                id: user.id, 
                mail: user.email 
            }),
            user,
        };
    }    
}

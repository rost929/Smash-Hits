// src/modules/user/controllers/user.controller.ts
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import config from 'src/config';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private configService: ConfigService
        ) { }

    @Get()
    async findAllUsers(): Promise<UserDto[]> {
        //console.log("env var", this.configService.get('config').jwtSecret);
        return this.userService.findAll();
    }

    @Get('by-email')
    async findByEmail(@Query('email') email: string): Promise<UserDto> {
        console.log(email);
        
        return this.userService.findByEmail(email);
    }

    
}

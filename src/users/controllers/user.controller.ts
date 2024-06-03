// src/modules/user/controllers/user.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get()
    async findAllUsers(): Promise<UserDto[]> {
        return this.userService.findAll();
    }

    @Get('by-email')
    async findByEmail(@Query('email') email: string): Promise<UserDto> {
        return this.userService.findByEmail(email);
    }
}

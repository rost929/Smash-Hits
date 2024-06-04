// src/modules/user/controllers/user.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersResponseDto } from '../dtos/UsersResponse.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Get()
    async findAllUsers(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ): Promise<UsersResponseDto> {
        return this.userService.findAll(Number(page), Number(limit));
    }

    @Get('by-email')
    async findByEmail(@Query('email') email: string): Promise<UserDto> {
        return this.userService.findByEmail(email);
    }
}

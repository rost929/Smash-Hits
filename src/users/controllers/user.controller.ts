// src/modules/user/controllers/user.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersResponseDto } from '../dtos/UsersResponse.dto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: 'number', example: 10 })
  @ApiResponse({
    status: 200,
    type: UsersResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async findAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<UsersResponseDto> {
    return this.userService.findAll(Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'Get user by email' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('user/by-email')
  async findByEmail(@Query('email') email: string): Promise<UserDto> {
    return this.userService.findByEmail(email);
  }
}

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { loginResponseDto } from '../dtos/loginResponse.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user to get token authentication' })
  @ApiBody({ required: true, type: LoginDto })
  @ApiResponse({
    status: 200,
    type: loginResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('login')
  async login(
    @Body(new ValidationPipe()) userCredentials: LoginDto,
    @Response() res,
  ) {
    const loginResponse = await this.authService.login(userCredentials);

    if (loginResponse.validCredentials === false) {
      return res.status(400).send(loginResponse);
    }

    res.status(HttpStatus.OK).json(loginResponse);
  }
}

import { Body, Controller, HttpStatus, Post, Request, Response, ValidationPipe ,UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { LoginDto } from "../dtos/login.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body(new ValidationPipe()) userCredentials : LoginDto, @Response() res) {

    const loginResponse = await this.authService.login(userCredentials);

    if (loginResponse.validCredentials === false) {
      return res.status(400).send(loginResponse)
    }

    res.status(HttpStatus.OK).json(loginResponse);
  }
}

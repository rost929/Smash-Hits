import { Controller, HttpStatus, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
 // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Request() req, @Response() res) {

    const user = req.body.user;
    const token = await this.authService.login(user);

    if (!token) {
      return res.status(400).send('User or password invalid')
    }
    
    res.status(HttpStatus.OK).json(token);
  }
}

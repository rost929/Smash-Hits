import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../users/services/user.service';
import { LoginDto } from '../dtos/login.dto';
import { loginResponse } from '../dtos/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user: LoginDto): Promise<loginResponse> {
    const loginInfo = await this.validateUser(user.email, user.password);
    if (loginInfo.validCredentials) return this.generateJWT(loginInfo);
    return loginInfo;
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<loginResponse> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return { email: user.email, validCredentials: true };
      return {
        email: user.email,
        validCredentials: false,
        message: `Wrong credentials, mail or password invalid`,
      };
    }
    return {
      email: null,
      validCredentials: false,
      message: `email not registered`,
    };
  }

  private async generateJWT(loginInfo: loginResponse) {
    return {
      access_token: this.jwtService.sign({ email: loginInfo.email }),
      ...loginInfo,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/User.service';
import { SignUpDto } from '../dtos/Signup.dto';
import { User } from '../../users/models/database/User.model';
import { SignUpResponseDto } from '../dtos/SignupResponse.dto';

@Injectable()
export class RegistrationService {
  constructor(private usersService: UserService) {}

  async signUp(newUser: SignUpDto): Promise<SignUpResponseDto> {
    const foundUser = await this.usersService.findByEmail(newUser.email);
    if (foundUser) {
      return {
        email: newUser.email,
        userExistsPreviously: true,
        message: `Could not register, user already exists`,
      };
    }
    const user: User = this.buildNewUser(newUser);

    await this.usersService.createUser(user);

    return {
      email: newUser.email,
      message: `User signed up successfully`,
      userExistsPreviously: false,
    };
  }

  private buildNewUser(newUser: SignUpDto): User {
    return {
      ...newUser,
    } as User;
  }
}

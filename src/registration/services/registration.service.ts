import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';
import { SignUpDto } from '../dtos/signup.dto';
import { User } from '../../users/models/user.model';

@Injectable()
export class RegistrationService {
  constructor(private usersService: UserService) {}

  async signUp(newUser: SignUpDto) {
    const foundUser = await this.usersService.findByEmail(newUser.email);
    if (foundUser) {
      return {
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

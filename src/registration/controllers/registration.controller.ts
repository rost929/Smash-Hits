import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Response,
  ValidationPipe,
} from '@nestjs/common';
import { RegistrationService } from '../services/registration.service';
import { SignUpDto } from '../dtos/signup.dto';

@Controller('sign-up')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @Post()
  async singUp(
    @Body(new ValidationPipe()) newUser: SignUpDto,
    @Response() res,
  ) {
    const signUpResponse = await this.registrationService.signUp(newUser);

    if (signUpResponse.userExistsPreviously === true) {
      return res.status(400).send(signUpResponse);
    }

    res.status(HttpStatus.OK).json(signUpResponse);
  }
}

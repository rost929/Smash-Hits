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
import { SignUpResponseDto } from "../dtos/signupResponse.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('sign-up')
@Controller('sign-up')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @ApiOperation({ summary: 'User sign up' })
  @ApiBody({ required: true, type: SignUpDto })
  @ApiResponse({
    status: 200,
    type: SignUpResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
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

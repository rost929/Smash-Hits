import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: `email must be a valid one` })
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  @Matches(/^(?=.*\d)(?=.*[!@#?\]])(?=.*[a-z])(?=.*[A-Z]).{10,}$/, {
    message: `Password should meet complexity requirements: 10 characters, 1 lowercase, 1 uppercase, 1 special character`,
  })
  password: string;
}

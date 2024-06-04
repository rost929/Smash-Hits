import { IsEmail, IsNotEmpty } from 'class-validator';

export class OwnerDto {
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty()
  email: string;
}

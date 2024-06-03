import { IsNotEmpty, IsEmail } from "class-validator";

export class UserDto {

    id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    name: string;

    @IsNotEmpty()
    password: string
}
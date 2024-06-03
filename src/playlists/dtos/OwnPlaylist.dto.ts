import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class OwnPlaylistDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
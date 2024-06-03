import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEmail } from 'class-validator';


export class CreatePlaylistDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsBoolean()
    isPublic: boolean

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    emailOwner: string;
}
import { IsEmail, IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdatePlaylistDto {
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message : `title playlist required at least to make and update`})
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    newTitle: string

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    isPublic: boolean;
}

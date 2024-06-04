import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserPlaylistDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    playlistId: number;

}
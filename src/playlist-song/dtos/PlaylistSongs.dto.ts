import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PlaylistSongDto {
  @IsString()
  @IsNotEmpty()
  playlistId: number;

  @IsNumber()
  @IsNotEmpty()
  songId: number;
}

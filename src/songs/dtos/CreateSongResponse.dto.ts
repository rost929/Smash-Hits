import { ApiProperty } from '@nestjs/swagger';
import { Song } from '../models/song.model';

export class CreateSongtResponseDto {
  @ApiProperty()
  newSong: Song;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: boolean;
}

import { ApiProperty } from '@nestjs/swagger';
import { Song } from '../models/song.model';

export class CreateSongtResponseDto {
  @ApiProperty()
  newSong: Song;

  @ApiProperty()
  playlist?: string;

  @ApiProperty()
  emailOwner?: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: boolean;
}

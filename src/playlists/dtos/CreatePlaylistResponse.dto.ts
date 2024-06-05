import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from '../models/playlist.model';

export class CreatePlaylistResponseDto {
  @ApiProperty()
  newPlaylist: Playlist;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: boolean;
}

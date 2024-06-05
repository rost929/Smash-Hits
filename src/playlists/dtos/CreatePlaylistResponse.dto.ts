import { ApiProperty } from '@nestjs/swagger';
import { PlaylistDto } from './Playlist.dto';

export class CreatePlaylistResponseDto {
  @ApiProperty()
  newPlaylist: PlaylistDto;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: boolean;
}

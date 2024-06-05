import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from '../models/playlist.model';

export class PlaylistsResponseDto {
  @ApiProperty()
  playlists: Playlist[];

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: boolean;

  @ApiProperty()
  totalItems?: number;

  @ApiProperty()
  totalPages?: number;

  @ApiProperty()
  currentPage?: number;
}

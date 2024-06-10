import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from '../models/business/Playlist.model';
import { UserDto } from '../../users/dtos/User.dto';

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

  @ApiProperty()
  userOwner?: UserDto;
}

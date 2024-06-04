import { Playlist } from '../models/playlist.model';

export class CreatePlaylistResponseDto {
  newPlaylist: Playlist;
  message?: string;
  error?: boolean;
}

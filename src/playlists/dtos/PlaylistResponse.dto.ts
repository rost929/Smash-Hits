import { Playlist } from '../models/database/playlist.model';

export class PlaylistResponseDto {
  playlist: Playlist;
  message?: string;
  error?: boolean;
}

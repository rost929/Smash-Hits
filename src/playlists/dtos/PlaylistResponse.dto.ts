import { Playlist } from '../models/database/Playlist.model';

export class PlaylistResponseDto {
  playlist: Playlist;
  message?: string;
  error?: boolean;
}

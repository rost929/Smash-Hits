import { Playlist } from '../models/playlist.model';

export class PlaylistResponseDto {
  playlist: Playlist;
  message?: string;
  error?: boolean;
}

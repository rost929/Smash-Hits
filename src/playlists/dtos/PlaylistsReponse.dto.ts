import { Playlist } from '../models/playlist.model';

export class PlaylistsResponseDto {
  playlists: Playlist[];
  message?: string;
  error?: boolean;

  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
}

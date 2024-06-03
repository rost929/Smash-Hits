import { Playlist } from "../models/playlist.model";

export class PlaylistResponseDto {        
    playlists: Playlist[]
    message?: string;
    error?: boolean;
}
import { Injectable } from '@nestjs/common';
import { SpotifyService } from '../../spotify/services/spotify.service';
import { TrackInfoDto } from '../dtos/TrackInfo.dto';
import { SongResponseDto } from '../dtos/SongResponse.dto';

@Injectable()
export class SongService {
  constructor(private spotifyProvider: SpotifyService) {}

  async searchTrackByName(trackData: TrackInfoDto): Promise<SongResponseDto> {
    const foundTrack = await this.spotifyProvider.searchTrackByName(trackData);
    const trackInfo = foundTrack.tracks.items[0];
    return this.buildNewSong(trackInfo);
  }

  private buildNewSong(trackInfo: any): SongResponseDto {
    return {
      name: trackInfo.name,
      album: trackInfo.album.name,
      artist: trackInfo.artists[0].name,
      trackId: trackInfo.id,
      duration: trackInfo.duration_ms / 1000 / 60,
      releaseDate: trackInfo.album.release_date,
    };
  }
}

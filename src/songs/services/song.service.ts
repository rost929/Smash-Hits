import { Injectable } from '@nestjs/common';
import { SpotifyService } from '../../spotify/services/spotify.service';
import { TrackInfoDto } from '../dtos/TrackInfo.dto';
import { SongResponseDto } from '../dtos/SongResponse.dto';
import { SongRepository } from '../repository/song.repository';
import { Song } from '../song.model';

@Injectable()
export class SongService {
  constructor(
    private spotifyProvider: SpotifyService,
    private songRepository: SongRepository,
  ) {}

  async searchTrackByName(trackData: TrackInfoDto): Promise<SongResponseDto> {
    const foundTrack = await this.spotifyProvider.searchTrackByName(trackData);
    const trackInfo = foundTrack.tracks.items[0];
    console.log(trackInfo);

    return this.buildNewSong(trackInfo);
  }

  async createSong(trackData: TrackInfoDto) {
    const songInfo: SongResponseDto = await this.searchTrackByName(trackData);

    const { name, artist, album, duration, releaseDate } = songInfo;
    const newSong = {
      title: name,
      artist,
      album,
      duration,
      releaseDate,
    } as Song;

    return await this.songRepository.create(newSong);
  }

  private buildNewSong(trackInfo: any): SongResponseDto {
    const { name, album, artists, id, duration_ms } = trackInfo;
    console.log(duration_ms, typeof duration_ms);

    const durationFormatted = this.convertDurationToTimeType(duration_ms);

    return {
      name: name,
      album: album.name,
      artist: artists[0].name,
      trackId: id,
      duration: durationFormatted,
      releaseDate: new Date(album.release_date),
    };
  }

  private convertDurationToTimeType(duration: number): string {
    const sec = Math.floor((duration / 1000) % 60);
    const min = Math.floor((duration / (1000 * 60)) % 60);
    const hour = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}

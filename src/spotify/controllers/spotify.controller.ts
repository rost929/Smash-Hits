import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SpotifyService } from '../services/spotify.service';
import { TrackDto } from 'src/songs/dtos/Track.dto';
import { ArtistDto } from 'src/songs/dtos/Artist.dto';
import { TrackInfoDto } from 'src/songs/dtos/TrackInfo.dto';

@Controller('spotify')
export class SpotifyController {
  constructor(
      private spotifyService: SpotifyService) {}    

  @Get('track')
  async getTrack(
    @Query(ValidationPipe) track: TrackDto,
        @Query(ValidationPipe) artist: ArtistDto
    ) {
        const trackData : TrackInfoDto = {
            track: track.track,
            artist: artist.artist || null
        }
    return await this.spotifyService.searchTrackByName(trackData);
  }
}

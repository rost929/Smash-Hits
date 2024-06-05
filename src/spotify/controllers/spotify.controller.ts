import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { SpotifyService } from '../services/spotify.service';
import { TrackDto } from 'src/songs/dtos/Track.dto';
import { ArtistDto } from 'src/songs/dtos/Artist.dto';
import { TrackInfoDto } from 'src/songs/dtos/TrackInfo.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SongResponseDto } from 'src/songs/dtos/SongResponse.dto';

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @ApiTags('spotify')
  @ApiOperation({ summary: 'Get a single track from spotify API' })
  @ApiQuery({
    name: 'track',
    required: true,
    type: 'string',
    example: 'The unforgiven',
  })
  @ApiQuery({
    name: 'artist',
    required: false,
    type: 'string',
    example: 'Metallica',
  })
  @ApiResponse({
    status: 200,
    type: SongResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('track')
  async getTrack(
    @Query(ValidationPipe) track: TrackDto,
    @Query(ValidationPipe) artist: ArtistDto,
  ) {
    const trackData: TrackInfoDto = {
      track: track.track,
      artist: artist.artist || null,
    };
    return await this.spotifyService.searchTrackByName(trackData);
  }
}

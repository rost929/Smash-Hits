import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SongService } from '../services/song.service';
import { TrackDto } from '../dtos/Track.dto';
import { ArtistDto } from '../dtos/Artist.dto';
import { TrackInfoDto } from '../dtos/TrackInfo.dto';
import { SongResponseDto } from '../dtos/SongResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('songs')
@Controller('songs')
@UseGuards(AuthGuard('jwt'))
export class SongController {
  constructor(private spotifyService: SongService) {}

  @ApiOperation({ summary: 'Get track from spotify API' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
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
  async getSong(
    @Query(ValidationPipe) track: TrackDto,
    @Query(ValidationPipe) artist: ArtistDto,
  ) {
    const trackData: TrackInfoDto = {
      track: track.track,
      artist: artist.artist || null,
    };
    return await this.spotifyService.searchTrackByName(trackData);
  }

  @ApiOperation({ summary: 'Save a new track from spotify API' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
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
  @Post('track')
  async createSong(
    @Query(ValidationPipe) track: TrackDto,
    @Query(ValidationPipe) artist: ArtistDto,
  ) {
    const trackData: TrackInfoDto = {
      track: track.track,
      artist: artist.artist || null,
    };
    return await this.spotifyService.createSong(trackData);
  }
}

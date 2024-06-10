import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SongService } from '../services/Song.service';
import { TrackDto } from '../dtos/Track.dto';
import { ArtistDto } from '../dtos/Artist.dto';
import { TrackInfoDto } from '../dtos/TrackInfo.dto';
import { SongResponseDto } from '../dtos/SongResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSongDto } from '../dtos/CreateSong.dto';
import { CreateSongtResponseDto } from '../dtos/CreateSongResponse.dto';

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
  ): Promise<SongResponseDto> {
    const trackData: TrackInfoDto = {
      track: track.track,
      artist: artist.artist || null,
    };
    return await this.spotifyService.searchTrackByName(trackData);
  }

  @ApiOperation({ summary: 'Create a new track into   an specific playlist' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiBody({ required: true, type: CreateSongDto })
  @ApiResponse({
    status: 200,
    type: CreateSongtResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('track')
  async createSong(
    @Body(ValidationPipe) createSongDto: CreateSongDto,
  ): Promise<CreateSongtResponseDto> {
    return await this.spotifyService.createSong(createSongDto);
  }
}

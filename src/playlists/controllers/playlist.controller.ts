import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { PlaylistService } from '../services/Playlist.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlaylistResponseDto } from '../dtos/CreatePlaylistResponse.dto';
import { PlaylistsResponseDto } from '../dtos/PlaylistsReponse.dto';
import { CreatePlaylistDto } from '../dtos/CreatePlaylist.dto';
import { OwnerDto } from '../dtos/Owner.dto';
import { TitleDto } from '../dtos/Title.dto';
import { PlaylistResponseDto } from '../dtos/PlaylistResponse.dto';
import { UpdatePlaylistDto } from '../dtos/UpdatePlaylistDto';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
@ApiTags('playlists')
@Controller('playlists')
@UseGuards(AuthGuard('jwt'))
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @ApiOperation({ summary: 'Get all public playlists' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: 'number', example: 10 })
  @ApiResponse({
    status: 200,
    type: PlaylistsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('/all/public')
  async getAllPublic(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PlaylistsResponseDto> {
    console.log('Page', typeof page);
    return await this.playlistService.getAllPublic(Number(page), Number(limit));
  }

  @ApiOperation({ summary: 'Get all playlists that belongs to a user' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiQuery({
    name: 'emailOwner',
    required: true,
    type: 'string',
    example: 'quentin.tarantino@example.com',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: 'number', example: 10 })
  @ApiResponse({
    status: 200,
    type: PlaylistsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('all/own')
  async getAllOwn(
    @Query(new ValidationPipe()) emailOwner: OwnerDto,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PlaylistsResponseDto> {
    return await this.playlistService.getAllOwn(
      emailOwner,
      Number(page),
      Number(limit),
    );
  }

  @ApiOperation({ summary: 'Get a playlist that belongs to a user' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    type: 'string',
    example: 'quentin.tarantino@example.com',
  })
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'playlist title',
    type: 'string',
    example: 'Reggae',
  })
  @ApiResponse({
    status: 200,
    type: PlaylistsResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('one/by-email')
  async findPlaylistByEmail(
    @Query(ValidationPipe) ownerEmail: OwnerDto,
    @Query(ValidationPipe) title: TitleDto,
  ): Promise<PlaylistResponseDto> {
    return await this.playlistService.getPlaylistByEmail(ownerEmail, title);
  }

  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiBody({ required: true, type: CreatePlaylistDto })
  @ApiResponse({
    status: 200,
    type: CreatePlaylistResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async create(
    @Body(new ValidationPipe()) createPlaylistDto: CreatePlaylistDto,
  ): Promise<CreatePlaylistResponseDto> {
    return await this.playlistService.create(createPlaylistDto);
  }

  @ApiOperation({ summary: 'Update a playlist' })
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Example: Bearer access_token',
  })
  @ApiBody({ required: true, type: UpdatePlaylistDto })
  @ApiResponse({
    status: 200,
    type: UpdatePlaylistDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Put()
  async update(@Body(ValidationPipe) updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistService.update(updatePlaylistDto);
  }
}

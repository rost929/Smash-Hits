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
import { PlaylistService } from '../services/playlist.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlaylistResponseDto } from '../dtos/CreatePlaylistResponse.dto';
import { PlaylistsResponseDto } from '../dtos/PlaylistsReponse.dto';
import { CreatePlaylistDto } from '../dtos/CreatePlaylist.dto';
import { OwnerDto } from '../dtos/Owner.dto';
import { PlaylistDto } from '../dtos/Playlist.dto';
import { PlaylistResponseDto } from '../dtos/PlaylistResponse.dto';
import { UpdatePlaylistDto } from '../dtos/UpdatePlaylistDto';

@UseGuards(AuthGuard('jwt'))
@Controller('playlists')
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createPlaylistDto: CreatePlaylistDto,
  ): Promise<CreatePlaylistResponseDto> {
    return await this.playlistService.create(createPlaylistDto);
  }

  @Get('all/public')
  async getAllPublic(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<PlaylistsResponseDto> {
    console.log('Page', typeof page);
    return await this.playlistService.getAllPublic(Number(page), Number(limit));
  }

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

  @Get('one/by-email')
  async findPlaylistByEmail(
    @Query(ValidationPipe) ownerEmail: OwnerDto,
    @Query(ValidationPipe) title: PlaylistDto,
  ): Promise<PlaylistResponseDto> {
    return await this.playlistService.getPlaylistByEmail(ownerEmail, title);
  }

  @Put()
  async updateUserEmail(
    @Body(ValidationPipe) updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return await this.playlistService.update(updatePlaylistDto);
  }
}

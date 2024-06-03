// src/modules/user/controllers/user.controller.ts
import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { PlaylistService } from '../services/playlist.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlaylistResponseDto } from '../dtos/CreatePlaylistResponseDto';
import { CreatePlaylistDto } from '../dtos/CreatePlaylistDto';

@UseGuards(AuthGuard('jwt'))
@Controller('playlists')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) { }
    
    @Post()
    async create(@Body(new ValidationPipe()) createPlaylistDto: CreatePlaylistDto): Promise<CreatePlaylistResponseDto> {
        return await this.playlistService.create(createPlaylistDto);
    }
}

import { Body, Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { PlaylistService } from '../services/playlist.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePlaylistResponseDto } from '../dtos/CreatePlaylistResponse.dto';
import { PlaylistResponseDto } from "../dtos/PlaylistReponse.dto";
import { CreatePlaylistDto } from '../dtos/CreatePlaylist.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('playlists')
export class PlaylistController {
    constructor(private playlistService: PlaylistService) { }
    
    @Post()
    async create(@Body(new ValidationPipe()) createPlaylistDto: CreatePlaylistDto): Promise<CreatePlaylistResponseDto> {
        return await this.playlistService.create(createPlaylistDto);
    }

    @Get('all-public')
    async getAllPublic() : Promise<PlaylistResponseDto>  {
        return await this.playlistService.getAllPublic();
    }
}

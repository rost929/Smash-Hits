import { Controller, Get, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { SongService } from '../services/song.service';
import { TrackDto } from '../dtos/Track.dto';
import { ArtistDto } from '../dtos/Artist.dto';
import { TrackInfoDto } from '../dtos/TrackInfo.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('songs')
@UseGuards(AuthGuard('jwt'))
export class SongController {
    constructor(
        private spotifyService: SongService) { }

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

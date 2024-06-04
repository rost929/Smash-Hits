import { Module } from '@nestjs/common';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';
import { SpotifyModule } from 'src/spotify/spotify.module';

@Module({
    imports: [SpotifyModule],
    controllers: [SongController],
    providers: [SongService],
    exports: [SongService],
})
export class SongModule { }

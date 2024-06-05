import { Module } from '@nestjs/common';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { SongRepository } from './repository/song.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './models/song.model';
import { PlaylistSongModule } from 'src/playlist-song/playlist-song.module';
import { PlaylistModule } from 'src/playlists/playlist.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Song]),
    SpotifyModule,
    PlaylistModule,
    PlaylistSongModule,
  ],
  controllers: [SongController],
  providers: [SongService, SongRepository],
  exports: [SongService],
})
export class SongModule {}

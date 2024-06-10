import { Module } from '@nestjs/common';
import { SongController } from './controllers/Song.controller';
import { SongService } from './services/Song.service';
import { SpotifyModule } from '../spotify/Spotify.module';
import { SongRepository } from './repository/Song.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './models/database/Song.model';
import { PlaylistSongModule } from '../playlist-song/PlaylistSong.module';
import { PlaylistModule } from '../playlists/playlist.module';

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

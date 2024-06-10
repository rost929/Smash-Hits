import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/Database.module';
import config from './config';
import { UserModule } from './users/User.module';
import { AuthModule } from './auth/Auth.module';
import { RegistrationModule } from './registration/Registration.module';
import { PlaylistModule } from './playlists/playlist.module';
import { UserPlaylistModule } from './user-playlist/UserPlaylist.module';
import { SpotifyModule } from './spotify/Spotify.module';
import { SongModule } from './songs/Song.module';
import { PlaylistSongModule } from './playlist-song/PlaylistSong.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    RegistrationModule,
    PlaylistModule,
    UserPlaylistModule,
    SpotifyModule,
    SongModule,
    PlaylistSongModule,
  ],
})
export class AppModule {}

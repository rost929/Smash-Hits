import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { RegistrationModule } from './registration/registration.module';
import { PlaylistModule } from './playlists/playlist.module';
import { UserPlaylistModule } from './user-playlist/user-playlist.module';
import { SpotifyModule } from './spotify/spotify.module';
import { SongModule } from './songs/song.module';
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
    SongModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/models/database/User.model';
import { Song } from '../songs/models/database/Song.model';
import { Playlist } from '../playlists/models/database/Playlist.model';
import { Playlist_Song } from '../playlist-song/models/database/PlaylistSong.model';
import { User_Playlist } from '../user-playlist/models/database/UserPlaylist.model';
@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get('config').database;
        return {
          dialect: 'postgres',
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.name,
          models: [User, Song, Playlist, Playlist_Song, User_Playlist],
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

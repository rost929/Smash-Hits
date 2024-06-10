import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistController } from './controllers/Playlist.controller';
import { PlaylistService } from './services/Playlist.service';
import { PlaylistRepository } from './repository/Playlist.repository';
import { Playlist } from './models/database/Playlist.model';
import { UserPlaylistModule } from '../user-playlist/UserPlaylist.module';
import { UserModule } from '../users/User.module';
import { User } from '../users/models/database/User.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Playlist]),
    SequelizeModule.forFeature([User]),
    UserModule,
    UserPlaylistModule,
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository],
  exports: [PlaylistService],
})
export class PlaylistModule {}

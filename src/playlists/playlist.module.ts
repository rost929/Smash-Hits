import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service';
import { PlaylistRepository } from './repository/playlist.repository';
import { Playlist } from './models/database/playlist.model';
import { UserPlaylistModule } from '../user-playlist/user-playlist.module';
import { UserModule } from '../users/user.module';
import { User } from '../users/models/database/user.model';

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

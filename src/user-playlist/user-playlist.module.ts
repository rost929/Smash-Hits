import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User_Playlist } from './models/database/UserPlaylist.model';
import { UserPlaylistService } from './services/user-playlist.service';
import { UserPlaylistRepository } from './repository/user-playlist.repository';

@Module({
  imports: [SequelizeModule.forFeature([User_Playlist])],
  providers: [UserPlaylistService, UserPlaylistRepository],
  exports: [UserPlaylistService],
})
export class UserPlaylistModule {}

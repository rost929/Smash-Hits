import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User_Playlist } from './models/database/UserPlaylist.model';
import { UserPlaylistService } from './services/UserPlaylist.service';
import { UserPlaylistRepository } from './repository/UserPlaylist.repository';

@Module({
  imports: [SequelizeModule.forFeature([User_Playlist])],
  providers: [UserPlaylistService, UserPlaylistRepository],
  exports: [UserPlaylistService],
})
export class UserPlaylistModule {}

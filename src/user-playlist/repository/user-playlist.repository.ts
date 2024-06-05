import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User_Playlist } from '../user-playlist.model';
import { Transaction } from 'sequelize';
import { UserPlaylistDto } from '../dtos/user-playlist.dto';

@Injectable()
export class UserPlaylistRepository {
  constructor(
    @InjectModel(User_Playlist) private userPlaylistModel: typeof User_Playlist,
  ) {}

  async create(
    userPlaylist: UserPlaylistDto,
    transaction: Transaction,
  ): Promise<User_Playlist> {
    return this.userPlaylistModel.create(userPlaylist, { transaction });
  }
}

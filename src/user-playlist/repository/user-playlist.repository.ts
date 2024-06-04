import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User_Playlist } from '../user-playlist.model';
import { Transaction } from 'sequelize';

@Injectable()
export class UserPlaylistRepository {
  constructor(
    @InjectModel(User_Playlist) private userPlaylistModel: typeof User_Playlist,
  ) {}

  async create(
    userPlaylist: User_Playlist,
    transaction: Transaction,
  ): Promise<User_Playlist> {
    return this.userPlaylistModel.create(userPlaylist, { transaction });
  }
}

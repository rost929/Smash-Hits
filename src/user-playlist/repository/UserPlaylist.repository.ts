import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User_Playlist } from '../models/database/UserPlaylist.model';
import { UserPlaylist } from '../models/business/UserPlaylist.model';
import { Transaction } from 'sequelize';

@Injectable()
export class UserPlaylistRepository {
  constructor(
    @InjectModel(User_Playlist) private userPlaylistModel: typeof User_Playlist,
  ) {}

  async create(
    userPlaylist: UserPlaylist,
    transaction: Transaction,
  ): Promise<UserPlaylist> {
    return this.userPlaylistModel.create(userPlaylist, { transaction });
  }
}

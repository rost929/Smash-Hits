import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from '../models/playlist.model';
import { User } from '../../users/models/user.model';
import { Transaction } from 'sequelize';
import { Playlists } from '../models/playlists.model';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectModel(Playlist) private playlistModel: typeof Playlist,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(
    playlist: Playlist,
    transaction: Transaction,
  ): Promise<Playlist> {
    return await this.playlistModel.create(playlist, { transaction });
  }

  async getAllPublicPlaylists(
    offset: number,
    limit: number,
  ): Promise<Playlists> {
    const { rows, count } = await this.playlistModel.findAndCountAll({
      where: { isPublic: true },
      offset,
      limit,
    });
    return { playlists: rows, count };
  }

  async getPlaylistByTitle(title: string, userId: number): Promise<Playlist> {
    return this.playlistModel.findOne({
      where: { title },
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
    });
  }

  async getPlaylistsByUserId(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<Playlist[]> {
    const user = await this.userModel.findByPk(userId, {
      include: [
        {
          model: Playlist,
          through: { attributes: [] },
        },
      ],
      limit,
      offset,
    });
    return user.playlists;
  }

  async update(playlist: Playlist): Promise<void> {
    await this.playlistModel.update(playlist, {
      where: { id: playlist.id },
      returning: true,
    });
  }
}

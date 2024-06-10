import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist as PlaylistDbModel } from '../models/database/playlist.model';
import { User } from '../../users/models/database/user.model';
import { Transaction } from 'sequelize';
import { Playlist } from '../models/business/playlist.model';
import { Playlists } from '../models/business/playlists.model';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectModel(PlaylistDbModel) private playlistModel: typeof PlaylistDbModel,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async create(
    playlist: Playlist,
    transaction: Transaction,
  ): Promise<Playlist> {
    const createdPlaylist = (
      await this.playlistModel.create(playlist, { transaction })
    ).get();
    return createdPlaylist as Playlist;
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
    return { playlists: rows, count } as Playlists;
  }

  async getPlaylistByTitle(title: string, userId: number): Promise<Playlist> {
    const playlist = await this.playlistModel.findOne({
      where: { title },
      include: [
        {
          model: User,
          where: { id: userId },
          through: { attributes: [] },
        },
      ],
    });
    return playlist as Playlist;
  }

  async getPlaylistsByUserId(
    userId: number,
    offset: number,
    limit: number,
  ): Promise<Playlist[]> {
    const user = await this.userModel.findByPk(userId, {
      include: [
        {
          model: PlaylistDbModel,
          through: { attributes: [] },
        },
      ],
      limit,
      offset,
    });
    return user.playlists as Playlist[];
  }

  async update(playlist: Playlist): Promise<void> {
    await this.playlistModel.update(playlist, {
      where: { id: playlist.id },
      returning: true,
    });
  }
}

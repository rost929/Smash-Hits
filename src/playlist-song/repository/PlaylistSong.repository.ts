import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PlaylistSong } from '../models/business/PlaylistSong.model';
import { Playlist_Song } from '../models/database/PlaylistSong.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PlaylistSongRepository {
  constructor(
    @InjectModel(Playlist_Song) private playlistSongModel: typeof Playlist_Song,
  ) {}

  async create(
    playlistSong: PlaylistSong,
    transaction: Transaction,
  ): Promise<PlaylistSong> {
    return this.playlistSongModel.create(playlistSong, { transaction });
  }
}

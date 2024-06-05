import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist_Song } from '../models/playlist-song.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PlaylistSongRepository {
  constructor(
    @InjectModel(Playlist_Song) private playlistSongModel: typeof Playlist_Song,
  ) {}

  async create(
    playlistSong: Playlist_Song,
    transaction: Transaction,
  ): Promise<Playlist_Song> {
    return this.playlistSongModel.create(playlistSong, { transaction });
  }
}

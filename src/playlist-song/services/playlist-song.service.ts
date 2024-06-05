import { Injectable } from '@nestjs/common';
import { PlaylistSongRepository } from '../repository/playlist-song.repository';
import { Playlist_Song } from '../models/playlist-song.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PlaylistSongService {
  constructor(
    private readonly playlistSongRepository: PlaylistSongRepository,
  ) {}

  async create(
    playlistSong: Playlist_Song,
    transaction: Transaction,
  ): Promise<Playlist_Song> {
    return await this.playlistSongRepository.create(playlistSong, transaction);
  }
}

import { Injectable } from '@nestjs/common';
import { PlaylistSongRepository } from '../repository/PlaylistSong.repository';
import { PlaylistSong } from '../models/business/PlaylistSong.model';
import { Transaction } from 'sequelize';
import { PlaylistSongDto } from '../dtos/PlaylistSongs.dto';

@Injectable()
export class PlaylistSongService {
  constructor(
    private readonly playlistSongRepository: PlaylistSongRepository,
  ) {}

  async create(
    playlistSong: PlaylistSongDto,
    transaction: Transaction,
  ): Promise<PlaylistSong> {
    return await this.playlistSongRepository.create(playlistSong, transaction);
  }
}

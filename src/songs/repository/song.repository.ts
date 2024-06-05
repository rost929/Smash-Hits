import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from '../models/song.model';
import { Transaction } from 'sequelize';

@Injectable()
export class SongRepository {
  constructor(@InjectModel(Song) private songModel: typeof Song) {}

  async create(song: Song, transaction: Transaction): Promise<Song> {
    return await this.songModel.create(song, { transaction });
  }
}

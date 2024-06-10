import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from '../models/database/song.model';
import { Songs } from '../models/business/song.model';
import { Transaction } from 'sequelize';

@Injectable()
export class SongRepository {
  constructor(@InjectModel(Song) private songModel: typeof Song) {}

  async create(song: Songs, transaction: Transaction): Promise<Songs> {
    return await this.songModel.create(song, { transaction });
  }
}

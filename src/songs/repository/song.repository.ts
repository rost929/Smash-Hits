import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from '../song.model';

@Injectable()
export class SongRepository {
  constructor(@InjectModel(Song) private songModel: typeof Song) {}

  async create(song: Song): Promise<Song> {
    return await this.songModel.create(song);
  }
}

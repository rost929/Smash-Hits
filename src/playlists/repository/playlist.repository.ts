import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from '../models/playlist.model';
import { Transaction } from 'sequelize';

@Injectable()
export class PlaylistRepository {
    constructor(@InjectModel(Playlist) private playlistModel: typeof Playlist) { }

    async create(playlist: Playlist, transaction: Transaction): Promise<Playlist> {
        return await this.playlistModel.create( playlist, { transaction } );
    }
}

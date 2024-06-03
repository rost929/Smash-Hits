import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from '../models/playlist.model';
import { User } from "../../users/models/user.model";
import { Transaction } from 'sequelize';

@Injectable()
export class PlaylistRepository {
    constructor(
        @InjectModel(Playlist) private playlistModel: typeof Playlist,
        @InjectModel(User) private userModel: typeof User
    ) { }

    async create(playlist: Playlist, transaction: Transaction): Promise<Playlist> {
        return await this.playlistModel.create(playlist, { transaction });
    }


    async getAllPublicPlaylists(): Promise<Playlist[]> {
        return await this.playlistModel.findAll({ where: { isPublic: true } })
    }

    async getPlayListsByUserId(userId: number): Promise<Playlist[]> {
        const user = await this.userModel.findByPk(userId, {
            include: [{
                model: Playlist,
                through: { attributes: [] },
            }],
        });

        return user.playlists;
    }
}

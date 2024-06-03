import { Injectable } from '@nestjs/common';
import { UserPlaylistRepository } from '../repository/user-playlist.repository';
import { User_Playlist } from '../user-playlist.model';
import { Transaction } from 'sequelize';

@Injectable()
export class UserPlaylistService {
    constructor(private readonly userPlaylistRepository: UserPlaylistRepository) { }

    async create(userPlaylist : User_Playlist, transaction : Transaction) : Promise<User_Playlist> {
        return await this.userPlaylistRepository.create(userPlaylist, transaction);
    }
}

import { Injectable } from '@nestjs/common';
import { UserPlaylistRepository } from '../repository/user-playlist.repository';
import { Transaction } from 'sequelize';
import { UserPlaylistDto } from '../dtos/user-playlist.dto';

@Injectable()
export class UserPlaylistService {
  constructor(
    private readonly userPlaylistRepository: UserPlaylistRepository,
  ) {}

  async create(
    userPlaylist: UserPlaylistDto,
    transaction: Transaction,
  ): Promise<UserPlaylistDto> {
    return await this.userPlaylistRepository.create(userPlaylist, transaction);
  }
}

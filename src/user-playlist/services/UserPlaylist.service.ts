import { Injectable } from '@nestjs/common';
import { UserPlaylistRepository } from '../repository/UserPlaylist.repository';
import { Transaction } from 'sequelize';
import { UserPlaylistDto } from '../dtos/UserPlaylist.dto';
import { UserPlaylist } from '../models/business/UserPlaylist.model';

@Injectable()
export class UserPlaylistService {
  constructor(
    private readonly userPlaylistRepository: UserPlaylistRepository,
  ) {}

  async create(
    userPlaylist: UserPlaylistDto,
    transaction: Transaction,
  ): Promise<UserPlaylist> {
    return await this.userPlaylistRepository.create(userPlaylist, transaction);
  }
}

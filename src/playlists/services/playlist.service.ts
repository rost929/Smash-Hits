import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from '../repository/Playlist.repository';
import { UserService } from '../../users/services/User.service';
import { CreatePlaylistDto } from '../dtos/CreatePlaylist.dto';
import { Playlist } from '../models/business/Playlist.model';
import { CreatePlaylistResponseDto } from '../dtos/CreatePlaylistResponse.dto';
import { UserPlaylistService } from '../../user-playlist/services/UserPlaylist.service';
import { Sequelize } from 'sequelize-typescript';
import { PlaylistsResponseDto } from '../dtos/PlaylistsReponse.dto';
import { OwnerDto } from '../dtos/Owner.dto';
import { TitleDto } from '../dtos/Title.dto';
import { PlaylistResponseDto } from '../dtos/PlaylistResponse.dto';
import { UpdatePlaylistDto } from '../dtos/UpdatePlaylistDto';
import { Playlists } from '../models/business/Playlists.model';
import { PlaylistDto } from '../dtos/Playlist.dto';
import { UserPlaylistDto } from '../../user-playlist/dtos/UserPlaylist.dto';
import { UserPlaylist } from 'src/user-playlist/models/business/UserPlaylist.model';

@Injectable()
export class PlaylistService {
  constructor(
    private readonly userService: UserService,
    private readonly userPlaylistService: UserPlaylistService,
    private readonly playlistRepository: PlaylistRepository,
    private readonly sequelize: Sequelize,
  ) {}

  async create(
    playlist: CreatePlaylistDto,
  ): Promise<CreatePlaylistResponseDto> {
    const transaction = await this.sequelize.transaction();
    try {
      const user = await this.userService.findByEmail(playlist.emailOwner);
      if (!user)
        return {
          newPlaylist: null,
          message: `User does not exist`,
          error: true,
        };

      const playlistExists: boolean = await this.validateIfPlaylistExistAlready(
        playlist.title,
        user.id,
      );
      if (playlistExists) {
        return {
          newPlaylist: null,
          message: `User ${playlist.emailOwner} has a ${playlist.title} playlist already`,
        };
      }

      const newPlaylist: Playlist = this.buildNewPlaylist(playlist);

      const createdPlaylist: Playlist = await this.playlistRepository.create(
        newPlaylist,
        transaction,
      );

      const newUserPlaylist: UserPlaylistDto = this.buildNewUserPlaylist(
        user.id,
        createdPlaylist.id,
      );
      await this.userPlaylistService.create(newUserPlaylist, transaction);

      await transaction.commit();
      return {
        newPlaylist: createdPlaylist,
        message: `Playlist created successfully`,
      };
    } catch (error) {
      await transaction.rollback();
      return {
        newPlaylist: null,
        message: `Error when trying to create a new playlist`,
        error: true,
      };
    }
  }

  async getAllPublic(
    page: number,
    limit: number,
  ): Promise<PlaylistsResponseDto> {
    const offset = (page - 1) * limit;
    const playlists: Playlists =
      await this.playlistRepository.getAllPublicPlaylists(offset, limit);

    const totalPages = Math.ceil(playlists.count / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    if (playlists)
      return {
        playlists: playlists.playlists,
        totalItems: playlists.count,
        totalPages,
        currentPage,
      };

    return { playlists: null, message: `No public playlists found` };
  }

  async getAllOwn(
    emailOwner: OwnerDto,
    page: number,
    limit: number,
  ): Promise<PlaylistsResponseDto> {
    const user = await this.userService.findByEmail(emailOwner.email);
    if (!user)
      return { playlists: null, message: `User does not exist`, error: true };

    const offset = (page - 1) * limit;
    const playlists: Playlist[] =
      await this.playlistRepository.getPlaylistsByUserId(
        user.id,
        offset,
        limit,
      );

    if (!playlists || playlists.length === 0) {
      return {
        playlists: null,
        message: `No playlists found from ${emailOwner}`,
      };
    }

    const totalPages = Math.ceil(playlists.length / limit);
    const currentPage = Math.floor(offset / limit) + 1;

    return {
      playlists,
      userOwner: user,
      totalItems: playlists.length,
      totalPages,
      currentPage,
    };
  }

  async getPlaylistByEmail(
    owner: OwnerDto,
    playlist: TitleDto,
  ): Promise<PlaylistResponseDto> {
    const user = await this.userService.findByEmail(owner.email);
    if (!user)
      return { playlist: null, message: `User does not exist`, error: true };

    const foundPlaylist: Playlist =
      await this.playlistRepository.getPlaylistByTitle(playlist.title, user.id);
    if (!foundPlaylist) {
      return {
        playlist: null,
        message: `No ${playlist.title} playlist found for ${owner.email} `,
        error: true,
      };
    }

    return { playlist: foundPlaylist } as PlaylistResponseDto;
  }

  async update(
    updatePlaylistDto: UpdatePlaylistDto,
  ): Promise<PlaylistResponseDto> {
    const { email, title } = updatePlaylistDto;

    const owner = { email } as OwnerDto;
    const playlist = { title } as TitleDto;

    const foundPlaylist: PlaylistResponseDto = await this.getPlaylistByEmail(
      owner,
      playlist,
    );
    if (!foundPlaylist.playlist) return foundPlaylist;

    const playlistToUpdate: PlaylistDto = this.buildNewPlaylistUpdated(
      updatePlaylistDto,
      foundPlaylist.playlist.id,
    );
    await this.playlistRepository.update(playlistToUpdate);

    const updatedPlayList = { title: playlistToUpdate.title } as TitleDto;
    const playlisUpdated: PlaylistResponseDto = await this.getPlaylistByEmail(
      owner,
      updatedPlayList,
    );

    return {
      playlist: playlisUpdated.playlist,
      message: `Playlist updated successfully`,
    } as PlaylistResponseDto;
  }

  async validateIfPlaylistExistAlready(
    title: string,
    userId: number,
  ): Promise<boolean> {
    const playlistFound: Playlist =
      await this.playlistRepository.getPlaylistByTitle(title, userId);
    return playlistFound && playlistFound.title === title ? true : false;
  }

  buildNewPlaylist(playlist: CreatePlaylistDto): Playlist {
    return {
      title: playlist.title,
      description: playlist.title || null,
      isPublic: playlist.isPublic,
    } as Playlist;
  }

  buildNewPlaylistUpdated(playlist: UpdatePlaylistDto, id: number): Playlist {
    return {
      id: id,
      title: playlist.newTitle || playlist.title,
      description: playlist.description || null,
      isPublic: playlist.isPublic,
    } as Playlist;
  }

  buildNewUserPlaylist(userId: number, playlistId: number): UserPlaylist {
    return {
      userId: userId,
      playlistId: playlistId,
    } as UserPlaylist;
  }
}

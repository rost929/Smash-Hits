import { Injectable } from "@nestjs/common";
import { PlaylistRepository } from "../repository/playlist.repository";
import { UserService } from "../../users/services/user.service";
import { CreatePlaylistDto } from "../dtos/CreatePlaylist.dto";
import { Playlist } from "../models/playlist.model";
import { CreatePlaylistResponseDto } from "../dtos/CreatePlaylistResponse.dto";
import { UserPlaylistService } from "../../user-playlist/services/user-playlist.service";
import { User_Playlist } from "../../user-playlist/user-playlist.model";
import { Sequelize } from "sequelize-typescript";
import { PlaylistResponseDto } from "../dtos/PlaylistReponse.dto";
import { OwnPlaylistDto } from "../dtos/OwnPlaylist.dto";

@Injectable()
export class PlaylistService {

    constructor(
        private readonly userService: UserService,
        private readonly userPlaylistService: UserPlaylistService,
        private readonly playlistRepository: PlaylistRepository,
        private readonly sequelize: Sequelize
    ) { }

    async create(playlist: CreatePlaylistDto): Promise<CreatePlaylistResponseDto> {
        let transaction = await this.sequelize.transaction();
        try {
            const user = await this.userService.findByEmail(playlist.emailOwner)

            if (!user) return { newPlaylist: null, message: `User does not exist`, error: true }

            const newPlaylist: Playlist = this.buildNewPlaylist(playlist);
            const createdPlaylist = await this.playlistRepository.create(newPlaylist, transaction);

            const newUserPlaylist = this.buildNewUserPlaylist(user.id, createdPlaylist.id);
            console.log(newUserPlaylist);
            const result = await this.userPlaylistService.create(newUserPlaylist, transaction);
            console.log(result);
            
            await transaction.commit();
            return { newPlaylist: createdPlaylist, message: `Playlist created successfully` }

        } catch (error) {
            await transaction.rollback();
            return {
                newPlaylist: null,
                message: `Error when trying to create a new playlist`,
                error: true
            }
        }
    
    }

    async getAllPublic() : Promise<PlaylistResponseDto> {
        const playlists : Playlist[] =  await this.playlistRepository.getAllPublicPlaylists();

        if(playlists) return { playlists: playlists };

        return { playlists: null, message: `No public playlists found`};
    }

    async getAllOwn(emailOwner: OwnPlaylistDto) : Promise<PlaylistResponseDto> {
        const user = await this.userService.findByEmail(emailOwner.email)
        if (!user) return { playlists: null, message: `User does not exist`, error: true }
        
        const playlists : Playlist[] =  await this.playlistRepository.getPlayListsByUserId(user.id);

        if(playlists) return { playlists: playlists };

        return { playlists: null, message: `No playlists found from ${emailOwner}`};
    }

    private buildNewPlaylist(playlist: CreatePlaylistDto): Playlist {
        return {
            title: playlist.title,
            description: playlist.title || null,
            isPublic: playlist.isPublic,
        } as Playlist
    }

    private buildNewUserPlaylist(userId: number, playlistId: number): User_Playlist {
        return {
            userId: userId,
            playlistId: playlistId
        } as User_Playlist;
    }
}
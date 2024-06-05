import { Injectable } from '@nestjs/common';
import { SpotifyService } from '../../spotify/services/spotify.service';
import { TrackInfoDto } from '../dtos/TrackInfo.dto';
import { SongResponseDto } from '../dtos/SongResponse.dto';
import { Song } from '../models/song.model';
import { CreateSongDto } from '../dtos/CreateSong.dto';
import { PlaylistService } from 'src/playlists/services/playlist.service';
import { Sequelize } from 'sequelize-typescript';
import { SongRepository } from '../repository/song.repository';
import { PlaylistSongService } from 'src/playlist-song/services/playlist-song.service';
import { Playlist_Song } from 'src/playlist-song/models/playlist-song.model';
import { CreateSongtResponseDto } from '../dtos/CreateSongResponse.dto';

@Injectable()
export class SongService {
  constructor(
    private spotifyProvider: SpotifyService,
    private playlistService: PlaylistService,
    private songRepository: SongRepository,
    private playlistSongService: PlaylistSongService,
    private readonly sequelize: Sequelize,
  ) {}

  async searchTrackByName(trackData: TrackInfoDto): Promise<SongResponseDto> {
    const foundTrack = await this.spotifyProvider.searchTrackByName(trackData);
    const trackInfo = foundTrack.tracks.items[0];
    console.log(trackInfo);

    return this.buildNewSong(trackInfo);
  }

  async createSong(createSong: CreateSongDto): Promise<CreateSongtResponseDto> {
    const transaction = await this.sequelize.transaction();

    try {
      const owner = { email: createSong.email };
      const playlist = { title: createSong.playlist };

      //Validates internally if user and playlist exist and if the user is the playlist owner
      const foundPlaylist = await this.playlistService.getPlaylistByEmail(
        owner,
        playlist,
      );

      if (!foundPlaylist.playlist) {
        return {
          newSong: null,
          message: foundPlaylist.message,
          error: foundPlaylist.error,
        };
      }

      const songInfo: SongResponseDto =
        await this.searchTrackByName(createSong);
      const { name, artist, album, duration, releaseDate } = songInfo;
      const newSong = {
        title: name,
        artist,
        album,
        duration,
        releaseDate,
      } as Song;

      const songCreated = await this.songRepository.create(
        newSong,
        transaction,
      );

      const newPlaylistSong = {
        playlistId: foundPlaylist.playlist.id,
        songId: songCreated.id,
      } as Playlist_Song;

      await this.playlistSongService.create(newPlaylistSong, transaction);

      await transaction.commit();

      return {
        newSong: newSong,
        message: `Song created successfully`,
      };
    } catch (error) {
      await transaction.rollback();
      return {
        newSong: null,
        message: `Error when trying to create a new song`,
        error: true,
      };
    }
  }

  private buildNewSong(trackInfo: any): SongResponseDto {
    const { name, album, artists, id, duration_ms } = trackInfo;
    console.log(duration_ms, typeof duration_ms);

    const durationFormatted = this.convertDurationToTimeType(duration_ms);

    return {
      name: name,
      album: album.name,
      artist: artists[0].name,
      trackId: id,
      duration: durationFormatted,
      releaseDate: new Date(album.release_date),
    };
  }

  private convertDurationToTimeType(duration: number): string {
    const sec = Math.floor((duration / 1000) % 60);
    const min = Math.floor((duration / (1000 * 60)) % 60);
    const hour = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}

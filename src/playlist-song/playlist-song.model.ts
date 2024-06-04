import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { Playlist } from '../playlists/models/playlist.model';
import { Song } from '../songs/song.model';

@Table
export class Playlist_Song extends Model<Playlist_Song> {
  @ForeignKey(() => Playlist)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  playlistId: number;

  @ForeignKey(() => Song)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  songId: number;
}

import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Song } from '../../songs/models/song.model';
import { Playlist_Song } from '../../playlist-song/models/playlist-song.model';
import { User_Playlist } from '../../user-playlist/user-playlist.model';

@Table
export class Playlist extends Model<Playlist> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isPublic: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @BelongsToMany(() => User, () => User_Playlist)
  users: User[];

  @BelongsToMany(() => Song, () => Playlist_Song)
  songs: Song[];
}

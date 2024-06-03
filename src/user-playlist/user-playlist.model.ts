import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from '../users/models/user.model';
import { Playlist } from '../playlists/models/playlist.model';

@Table
export class User_Playlist extends Model<User_Playlist> {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ForeignKey(() => Playlist)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    playlistId: number;
}
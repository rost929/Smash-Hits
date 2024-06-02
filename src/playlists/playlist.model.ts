import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from '../users/models/user.model';
import { Song } from '../songs/song.model';
import { Playlist_Song } from '../playlist-song/playlist-song.model';
import { User_Playlist } from "../user-playlist/user-playlist.model";

@Table
export class Playlist extends Model<Playlist> {

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

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

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => User, () => User_Playlist)
    users: User[];

    @BelongsToMany(() => Song, () => Playlist_Song)
    songs: Song[];
}

import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Playlist } from '../../playlists/playlist.model';
import { User_Playlist } from "../../user-playlist/user-playlist.model";

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @BelongsToMany(() => Playlist, () => User_Playlist)
    playlists: Playlist[];
}

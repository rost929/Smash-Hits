import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { PlayList } from '../playlists/playlist.model';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    username: string;

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

    @HasMany(() => PlayList)
    playLists: PlayList[];
}

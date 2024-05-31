import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { Song } from '../songs/song.model';
import { PlayList_Song } from '../playlist-song/playlist-song.model';

@Table
export class PlayList extends Model<PlayList> {
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
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsToMany(() => Song, () => PlayList_Song)
    songs: Song[];
}

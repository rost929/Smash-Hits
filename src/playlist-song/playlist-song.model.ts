import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { PlayList } from '../playlists/playlist.model';
import { Song } from '../songs/song.model';

@Table
export class PlayList_Song extends Model<PlayList_Song> {
    @ForeignKey(() => PlayList)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    playListId: number;

    @ForeignKey(() => Song)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    songId: number;
}

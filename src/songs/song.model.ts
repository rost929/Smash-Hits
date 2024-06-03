import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { Playlist } from '../playlists/models/playlist.model';
import { Playlist_Song } from '../playlist-song/playlist-song.model';

@Table
export class Song extends Model<Song> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    artist: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    album: string;

    @Column({
        type: DataType.TIME,
        allowNull: false,
    })
    duration: string;

    @Column({
        type: DataType.STRING,
    })
    gender: string;

    @Column({
        type: DataType.DATE,
    })
    releaseDate: Date;

    @BelongsToMany(() => Playlist, () => Playlist_Song)
    playlists: Playlist[];
}

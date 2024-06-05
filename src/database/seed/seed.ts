import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Song } from '../../songs/models/song.model';
import { Playlist } from '../../playlists/models/playlist.model';
import { Playlist_Song } from '../../playlist-song/models/playlist-song.model';
import { User_Playlist } from '../../user-playlist/user-playlist.model';
import * as bcrypt from 'bcrypt';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sequelize = app.get(Sequelize);

  const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  };

  await sequelize.sync({ force: true });

  const users = await User.bulkCreate([
    {
      id: 1,
      email: 'han.solo@example.com',
      password: await hashPassword('Password123!'),
      name: 'Han Solo',
    },
    {
      id: 2,
      email: 'christoph.waltz@example.com',
      password: await hashPassword('Password123!'),
      name: 'Christoph Waltz',
    },
    {
      id: 3,
      email: 'quentin.tarantino@example.com',
      password: await hashPassword('Password123!'),
      name: 'Quentin Tarantino',
    },
  ]);

  const salsaSongs = await Song.bulkCreate([
    {
      title: 'El Cantante',
      artist: 'Héctor Lavoe',
      album: 'Comedia',
      duration: '06:47',
      gender: 'Salsa',
      releaseDate: new Date('1978-01-01'),
    },
    {
      title: 'A La Semana',
      artist: 'Héctor Lavoe',
      album: 'Revento',
      duration: '05:45',
      gender: 'Salsa',
      releaseDate: new Date('1985-01-01'),
    },
    {
      title: 'Periódico de Ayer',
      artist: 'Héctor Lavoe',
      album: 'De Ti Depende',
      duration: '06:45',
      gender: 'Salsa',
      releaseDate: new Date('1976-01-01'),
    },
    {
      title: 'Juanito Alimaña',
      artist: 'Héctor Lavoe',
      album: 'Vigilante',
      duration: '06:30',
      gender: 'Salsa',
      releaseDate: new Date('1983-01-01'),
    },
    {
      title: 'Mi Gente',
      artist: 'Héctor Lavoe',
      album: 'La Voz',
      duration: '05:26',
      gender: 'Salsa',
      releaseDate: new Date('1975-01-01'),
    },
    {
      title: 'Que Se Sepa',
      artist: 'Roberto Roena',
      album: 'La Herencia',
      duration: '05:47',
      gender: 'Salsa',
      releaseDate: new Date('1973-01-01'),
    },
    {
      title: 'Marejada Feliz',
      artist: 'Roberto Roena',
      album: 'Roberto Roena Y Su Apollo Sound',
      duration: '04:29',
      gender: 'Salsa',
      releaseDate: new Date('1970-01-01'),
    },
    {
      title: 'El Que Se Fue',
      artist: 'Roberto Roena',
      album: 'Que Suerte He Tenido De Nacer',
      duration: '04:45',
      gender: 'Salsa',
      releaseDate: new Date('1979-01-01'),
    },
    {
      title: 'Fuego En El 23',
      artist: 'La Sonora Ponceña',
      album: 'Explorando',
      duration: '05:00',
      gender: 'Salsa',
      releaseDate: new Date('1978-01-01'),
    },
    {
      title: "Hachero Pa' Un Palo",
      artist: 'La Sonora Ponceña',
      album: 'Musical Conquest',
      duration: '04:00',
      gender: 'Salsa',
      releaseDate: new Date('1980-01-01'),
    },
  ]);

  const rockSongs = await Song.bulkCreate([
    {
      title: 'De Música Ligera',
      artist: 'Soda Stereo',
      album: 'Canción Animal',
      duration: '03:33',
      gender: 'Rock',
      releaseDate: new Date('1990-01-01'),
    },
    {
      title: 'En La Ciudad De La Furia',
      artist: 'Soda Stereo',
      album: 'Doble Vida',
      duration: '05:53',
      gender: 'Rock',
      releaseDate: new Date('1988-01-01'),
    },
    {
      title: 'Persiana Americana',
      artist: 'Soda Stereo',
      album: 'Signos',
      duration: '04:54',
      gender: 'Rock',
      releaseDate: new Date('1986-01-01'),
    },
    {
      title: 'Nada Personal',
      artist: 'Soda Stereo',
      album: 'Nada Personal',
      duration: '03:55',
      gender: 'Rock',
      releaseDate: new Date('1985-01-01'),
    },
    {
      title: 'Cuando Pase El Temblor',
      artist: 'Soda Stereo',
      album: 'Nada Personal',
      duration: '03:50',
      gender: 'Rock',
      releaseDate: new Date('1985-01-01'),
    },
    {
      title: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin IV',
      duration: '08:02',
      gender: 'Rock',
      releaseDate: new Date('1971-01-01'),
    },
    {
      title: 'Whole Lotta Love',
      artist: 'Led Zeppelin',
      album: 'Led Zeppelin II',
      duration: '05:34',
      gender: 'Rock',
      releaseDate: new Date('1969-01-01'),
    },
    {
      title: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      duration: '05:55',
      gender: 'Rock',
      releaseDate: new Date('1975-01-01'),
    },
    {
      title: 'We Will Rock You',
      artist: 'Queen',
      album: 'News of the World',
      duration: '02:01',
      gender: 'Rock',
      releaseDate: new Date('1977-01-01'),
    },
    {
      title: 'We Are The Champions',
      artist: 'Queen',
      album: 'News of the World',
      duration: '03:00',
      gender: 'Rock',
      releaseDate: new Date('1977-01-01'),
    },
  ]);

  const eightiesSongs = await Song.bulkCreate([
    {
      title: 'Billie Jean',
      artist: 'Michael Jackson',
      album: 'Thriller',
      duration: '04:54',
      gender: 'Pop',
      releaseDate: new Date('1977-01-01'),
    },
    {
      title: 'Thriller',
      artist: 'Michael Jackson',
      album: 'Thriller',
      duration: '05:57',
      gender: 'Pop',
      releaseDate: new Date('1982-01-01'),
    },
    {
      title: 'Beat It',
      artist: 'Michael Jackson',
      album: 'Thriller',
      duration: '04:18',
      gender: 'Pop',
      releaseDate: new Date('1982-01-01'),
    },
    {
      title: 'Smooth Criminal',
      artist: 'Michael Jackson',
      album: 'Bad',
      duration: '04:17',
      gender: 'Pop',
      releaseDate: new Date('1987-01-01'),
    },
    {
      title: 'Bad',
      artist: 'Michael Jackson',
      album: 'Bad',
      duration: '04:07',
      gender: 'Pop',
      releaseDate: new Date('1987-01-01'),
    },
    {
      title: 'All Night Long',
      artist: 'Lionel Richie',
      album: "Can't Slow Down",
      duration: '06:25',
      gender: 'Pop',
      releaseDate: new Date('1983-01-01'),
    },
    {
      title: 'Hello',
      artist: 'Lionel Richie',
      album: "Can't Slow Down",
      duration: '04:10',
      gender: 'Pop',
      releaseDate: new Date('1983-01-01'),
    },
    {
      title: 'In the Air Tonight',
      artist: 'Phil Collins',
      album: 'Face Value',
      duration: '05:36',
      gender: 'Pop',
      releaseDate: new Date('1981-01-01'),
    },
    {
      title: 'Against All Odds (Take a Look at Me Now)',
      artist: 'Phil Collins',
      album: 'Against All Odds',
      duration: '03:25',
      gender: 'Pop',
      releaseDate: new Date('1984-01-01'),
    },
    {
      title: 'Sussudio',
      artist: 'Phil Collins',
      album: 'No Jacket Required',
      duration: '04:23',
      gender: 'Pop',
      releaseDate: new Date('1985-01-01'),
    },
  ]);

  const playlists = await Playlist.bulkCreate([
    { title: 'Salsa', description: 'Best Salsa Hits', isPublic: false },
    { title: 'Rock', description: 'Best Rock hits', isPublic: false },
    { title: 'Eighties', description: 'Best Eighties hits', isPublic: true },
  ]);

  await Playlist_Song.bulkCreate([
    ...salsaSongs.map((song) => ({
      playlistId: playlists[0].id,
      songId: song.id,
    })),
    ...rockSongs.map((song) => ({
      playlistId: playlists[1].id,
      songId: song.id,
    })),
    ...eightiesSongs.map((song) => ({
      playlistId: playlists[2].id,
      songId: song.id,
    })),
  ]);

  await User_Playlist.bulkCreate([
    { userId: users[0].id, playlistId: playlists[0].id },
    { userId: users[1].id, playlistId: playlists[1].id },
    { userId: users[2].id, playlistId: playlists[2].id },
  ]);

  console.log('Seed data has been inserted');
  await sequelize.close();
}

seed().catch((error) => {
  console.error('Error while seeding data:', error);
});

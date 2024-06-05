import { Module } from '@nestjs/common';
import { SongController } from './controllers/song.controller';
import { SongService } from './services/song.service';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { SongRepository } from './repository/song.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './song.model';

@Module({
  imports: [SequelizeModule.forFeature([Song]), SpotifyModule],
  controllers: [SongController],
  providers: [SongService, SongRepository],
  exports: [SongService],
})
export class SongModule {}

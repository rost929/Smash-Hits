import { Module } from '@nestjs/common';
import { SpotifyController } from './controllers/Spotify.controller';
import { SpotifyService } from './services/Spotify.service';
import { ConfigModule } from '@nestjs/config';
import { SpotifyProvider } from './providers/Spotify.provider';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SpotifyController],
  providers: [SpotifyService, SpotifyProvider],
  exports: [SpotifyService],
})
export class SpotifyModule {}

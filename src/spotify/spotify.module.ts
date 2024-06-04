import { Module } from '@nestjs/common';
import { SpotifyController } from './controllers/spotify.controller';
import { SpotifyService } from './services/spotify.service';
import { ConfigModule } from '@nestjs/config';
import { SpotifyProvider } from './providers/spotify.provider';
@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [SpotifyController],
  providers: [SpotifyService, SpotifyProvider],
  exports: [SpotifyService],
})
export class SpotifyModule {}

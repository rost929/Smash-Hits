import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { ConfigService } from '@nestjs/config/dist';

export class SpotifyProvider {

  constructor(private configService: ConfigService) { }
  getSpotifySdk() {
    const spotifyConfig = this.configService.get('config').spotify
    console.log("Spotify Config", spotifyConfig);
    
    const sdk = SpotifyApi.withClientCredentials("clientId", "SecretId")
    return sdk;
  };
}


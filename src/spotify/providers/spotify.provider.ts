import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
export class SpotifyProvider {
  constructor() {}
  getSpotifySdk() {
    const sdk = SpotifyApi.withClientCredentials(clientId, clientSecret);
    return sdk;
  }
}

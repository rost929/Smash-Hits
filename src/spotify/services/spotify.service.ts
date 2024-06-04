import { Inject, Injectable } from '@nestjs/common';
import { SpotifyProvider } from "../providers/spotify.provider";
import { TrackInfoDto } from 'src/songs/dtos/TrackInfo.dto';


@Injectable()
export class SpotifyService {
    constructor(private spotifyProvider: SpotifyProvider) { }

    async searchTrackByName(trackData: TrackInfoDto) {
        const spotifyApi = this.spotifyProvider.getSpotifySdk();

        const newSearch = this.buildEncodedSearch(trackData)
        console.log(newSearch);

        return await spotifyApi.search(newSearch, ["track"]);
    }

    private buildEncodedSearch(trackData : TrackInfoDto) {
        let newSearch = `track:${trackData.track}`;
        if (trackData.artist) newSearch += ` artist: ${trackData.artist}`;
        return encodeURIComponent(newSearch);
    }
}

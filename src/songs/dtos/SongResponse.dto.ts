import { ApiProperty } from '@nestjs/swagger';

export class SongResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  album: string;

  @ApiProperty()
  artist: string;

  @ApiProperty()
  trackId: string;

  @ApiProperty()
  duration: string;

  @ApiProperty()
  releaseDate: Date;
}

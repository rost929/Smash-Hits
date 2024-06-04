import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TrackInfoDto {
  @IsNotEmpty()
  @IsString()
  track: string;

  @IsOptional()
  @IsString()
  artist: string;
}

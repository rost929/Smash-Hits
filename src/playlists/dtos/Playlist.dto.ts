import { IsNotEmpty, IsString } from 'class-validator';

export class PlaylistDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

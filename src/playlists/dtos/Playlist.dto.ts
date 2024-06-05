import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PlaylistDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}

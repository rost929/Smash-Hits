import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSongDto {
  @ApiProperty({ required: true, example: 'quentin.tarantino@example.com' })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ required: true, example: 'Living On a Prayer' })
  @IsNotEmpty()
  @IsString()
  track: string;

  @ApiProperty({ required: false, example: 'Bon Jovi' })
  @IsOptional()
  @IsString()
  artist: string;

  @ApiProperty({ required: true, example: 'Rock' })
  @IsNotEmpty()
  @IsString()
  playlist: string;
}

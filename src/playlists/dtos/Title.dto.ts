import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TitleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}

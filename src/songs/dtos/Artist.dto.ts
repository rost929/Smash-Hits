import { IsOptional, IsString } from "class-validator";

export class ArtistDto {
    @IsOptional()
    @IsString()
    artist: string
}
import { IsNotEmpty, IsString } from "class-validator";

export class TrackDto {
    @IsString()
    @IsNotEmpty()
    track: string
}
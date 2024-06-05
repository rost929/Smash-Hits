import { ApiProperty } from "@nestjs/swagger";

export class SignUpResponseDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    userExistsPreviously: boolean;
}
import { ApiProperty } from "@nestjs/swagger";

export class loginResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  access_token?: string;

  @ApiProperty()
  validCredentials!: boolean;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  error?: boolean;
}

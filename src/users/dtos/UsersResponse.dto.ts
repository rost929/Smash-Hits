import { ApiProperty } from '@nestjs/swagger';
import { User } from '../models/business/user.model';

export class UsersResponseDto {
  @ApiProperty()
  users: User[];

  @ApiProperty()
  totalItems?: number;

  @ApiProperty()
  totalPages?: number;

  @ApiProperty()
  currentPage?: number;
}

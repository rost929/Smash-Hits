import { User } from "../models/user.model";


export class UsersResponseDto {
    users: User[];
    totalItems?: number;
    totalPages?: number;
    currentPage?: number; 
}
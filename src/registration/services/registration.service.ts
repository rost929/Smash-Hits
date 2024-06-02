import { Injectable } from "@nestjs/common";
import { UserService } from "../../users/services/user.service";
import { SignUpDto } from "../dtos/signup.dto";

@Injectable()
export class RegistrationService {
    constructor(
        private usersService: UserService,
    ) { }

    async signUp(newUser: SignUpDto) {
        const foundUser = await this.usersService.findByEmail(newUser.email);
        if (foundUser) {
            return {
                userExistsPreviously: true,
                message: `Could not register, user already exists`
            }
        }

        await this.usersService.createUser(newUser);

        return {
            email: newUser.email,
            message: `User signed up successfully`,
            userExistsPreviously: false,
        }
    }



}
export class loginResponse {
    email: string;
    access_token?: string;
    validCredentials!: boolean;
    message?: string;
    error?: boolean;
}
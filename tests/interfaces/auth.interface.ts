import { NumberModule } from "@faker-js/faker"

//body khi gui len server
export interface LoginPayLoad {
    email : string,
    password: string
}

export interface AuthResponse {
    token: string
    user?: {
        id: number;
        email: string;
        username: string;
    };
    expiresIn: string
}
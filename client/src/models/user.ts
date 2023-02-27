import { Basket } from "./basket";

export interface User {
    id: number;
    email: string;
    token: string;
    username: string;
    basket?: Basket;
    role: string;
}
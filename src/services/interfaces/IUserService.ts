import { User } from "../../model/User";

export interface IUserService {
    createUser(name: string) : Promise<User>;
    getUser(userId: string): Promise<User>;
}
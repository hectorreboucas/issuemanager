import { IUserService } from "./interfaces/IUserService";
import { Collection, ObjectId, Db } from "mongodb";
import { User } from "../model/User";

export class UserService implements IUserService {
    
    private collection : Collection<User>;

    constructor(db: Db) {
        this.collection = db.collection<User>("user");
    }

    async createUser(name: string): Promise<User> {
        let user = new User();
        user.name = name;
        await this.collection.insertOne(user);
        let _id = (user as any)._id as ObjectId;
        user.id = _id.toString();
        await this.collection.updateOne({ _id }, { $set: user });
        return user;
    }
    async getUser(userId: string): Promise<User> {
        return await this.collection.findOne({ id: userId });
    }

    async getUserList(): Promise<Array<User>> {
        return await this.collection.find({}).toArray();
    }
}
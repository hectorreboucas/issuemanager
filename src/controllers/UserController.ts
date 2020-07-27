import { Request, Response, NextFunction } from 'express';
import { App } from '../App';

export class UserController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        let { id } = req.query;
        let user = await this.app.getUser(id as string);
        res.json(user);
        res.send();
    }

    getUserList = async (req: Request, res: Response, next: NextFunction) => {
        let userList = await this.app.getUserList();
        res.json(userList);
        res.send();
    }    

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;
        let user = await this.app.createUser(name);
        res.json(user);
        res.send();
    }
}
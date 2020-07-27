import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { ItemNotFound } from '../exceptions/ItemNotFound';

export class UserController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { id } = req.query;
            let user = await this.app.getUser(id as string);
            if(!user)
                throw new ItemNotFound();
            res.json(user);
            res.send();
        } catch (e) {
            next(e);
        }
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
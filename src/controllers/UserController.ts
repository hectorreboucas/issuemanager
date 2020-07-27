import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { Resolver } from 'dns';

export class UserController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    createUser = async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;
        let user = await this.app.createUser(name);
        res.json(user);
        res.send();
    }
}
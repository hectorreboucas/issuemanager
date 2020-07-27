import { Request, Response, NextFunction } from 'express';
import { App } from '../App';

export class AgentController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    createAgent = async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;
        let agent = await this.app.createAgent(name);
        res.json(agent);
    }
}
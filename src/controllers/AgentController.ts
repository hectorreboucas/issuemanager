import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { AgentState } from '../model/Agent';
import { ItemNotFound } from '../exceptions/ItemNotFound';

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

    getAgentList = async (req: Request, res: Response, next: NextFunction) => {
        const { state } = req.query;
        let agentList = await this.app.getAgentList(state as AgentState);
        res.json(agentList);
    }

    getAgent = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.query;
            let agent = await this.app.getAgent(id as string);
            if(!agent)
                throw new ItemNotFound();
            res.json(agent);
        }catch(e){
            next(e);
        }
    }

}
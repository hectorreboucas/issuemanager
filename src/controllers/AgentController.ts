import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { AgentState } from '../model/Agent';

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
        const { id } = req.query;
        let agentList = await this.app.getAgent(id as string);
        res.json(agentList);
    }

}
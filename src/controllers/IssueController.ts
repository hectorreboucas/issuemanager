import { Request, Response, NextFunction } from 'express';
import { App } from '../App';
import { ItemNotFound } from '../exceptions/ItemNotFound';

export class IssueController {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    getIssue = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { id } = req.query;
            let issue = await this.app.getIssue(id as string);
            if(!issue)
                throw new ItemNotFound();
            res.json(issue);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    getIssueList = async (req: Request, res: Response, next: NextFunction) => {
        let filter = req.query;
        let issueList = await this.app.getIssueList(filter);
        res.json(issueList);
        res.send();
    }

    createIssue = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title, description, userId } = req.body;
            let issue = await this.app.createIssue(title, description, userId);
            res.json(issue);
            res.send();
        } catch (e) {
            console.log(e);
            res.status(404);
            res.send();
        }
    }
}
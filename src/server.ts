let express = require('express');
import { Application } from 'express';
import { IssueController } from './controllers/IssueController';
import { DependencyManager } from './DepencyManager';
import { AgentController } from './controllers/agentController';
import { UserController } from './controllers/userController';
import { ItemNotFound } from './exceptions/ItemNotFound';
let swaggerHelper = require('./swaggerHelper');

(async () => {

    let app: Application = express();

    app.use(express.json());

    await DependencyManager.load();

    let service = DependencyManager.app;

    let controllers = {
        "issueController": new IssueController(service),
        "agentController": new AgentController(service),
        "userController": new UserController(service)
    };

    swaggerHelper.setSwagger(app, "./resources/swagger.yaml", controllers);

    app.use((error, req, res, next) => {
        if(error instanceof ItemNotFound){
            res.status(404);
            res.json({message: "not found"});
            res.send();
        }else{
            res.status(500);
            res.json({message: "internal server error"});
            res.send();
        }
    });

    app.listen(3000, () => console.log(`Parners API listening on port ${3000}!`));

})();


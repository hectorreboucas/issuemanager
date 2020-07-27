import { IssueService } from "./services/IssueService";

import * as mongodb from "mongodb";
import { UserService } from "./services/UserService";
import { AgentService } from "./services/AgentService";
import { App } from "./App";
import { IIssueService } from "./services/interfaces/IIssueService";
import { IUserService } from "./services/interfaces/IUserService";

export class DependencyManager {
    static mongoClient : mongodb.MongoClient;
    static issueService: IIssueService;
    static userService: IUserService;
    static agentService: AgentService;
    static app: App;

    static async load() {
        DependencyManager.mongoClient = await mongodb.connect(process.env.MONGO_URL);
        let db = DependencyManager.mongoClient.db("issueDatabase");
        DependencyManager.issueService = new IssueService(db);
        DependencyManager.userService = new UserService(db);
        DependencyManager.agentService = new AgentService(db);
        DependencyManager.app = new App(DependencyManager.userService, DependencyManager.agentService, DependencyManager.issueService);
    }
}
import { IssueState } from "../model/Issue";
import * as mongodb from "mongodb";
import { IssueService } from "../services/IssueService";
import { UserService } from "../services/UserService";
import { AgentService } from "../services/AgentService";
import { App } from "../App";
import { AgentState } from "../model/Agent";

const { expect } = require('chai');

describe('Application', async function () {
    let app : App;
    let mongoClient;
    let db;
    let user;

    describe('Issue e Agent creation', async function () {

        before(async () => {
            mongoClient = await mongodb.connect(process.env.MONGO_URL);
            db = mongoClient.db("issueDatabase");
            let issueService = new IssueService(db);
            let userService = new UserService(db);
            let agentService = new AgentService(db);
            app = new App(userService, agentService, issueService);
            user = await app.createUser("user1");
            await app.createAgent("agent1");
        });

        it('issue state should be ASSIGNED', async function () {
            let issue = await app.createIssue("title1", "description1", user.id);
            expect(issue.state).to.be.deep.equal(IssueState.ASSIGNED.toString());
        });

        it('issue state should be UNASSINED', async function () {
            let issue = await app.createIssue("title2", "description1", user.id);
            expect(issue.state).to.be.deep.equal(IssueState.UNASSIGNED.toString());
        });

        it('agent state should be BUSY', async function () {
            let agent = await app.createAgent("agent2");
            expect(agent.state).to.be.deep.equal(AgentState.BUSY.toString());
        });

        it('agent state should be FREE', async function () {
            let agent = await app.createAgent("agent3");
            expect(agent.state).to.be.deep.equal(AgentState.FREE.toString());
        });       


        after(async () => {
            await db.collection("issue").deleteMany({title: {$in: ["title1", "title2", "title3"]}});
            await db.collection("agent").deleteMany({name: {$in: ["agent1", "agent2", "agent3"]}});
            await db.collection("user").deleteMany({name: {$in: ["user1"]}});
            await mongoClient.close();
        });

    });

});

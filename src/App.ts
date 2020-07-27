import { Issue, IssueState, IssueFilter } from "./model/Issue";
import { AgentState, Agent } from "./model/Agent";
import { IUserService } from "./services/interfaces/IUserService";
import { IIssueService } from "./services/interfaces/IIssueService";
import { IAgentService } from "./services/interfaces/IAgentService";
import { User } from "./model/User";

export class App {

    private userService: IUserService;
    private agentService: IAgentService;
    private issueService: IIssueService;

    constructor(userService: IUserService, agentService: IAgentService, issueService: IIssueService) {
        this.userService = userService;
        this.agentService = agentService;
        this.issueService = issueService;
    }

    public async createUser(name: string): Promise<User> {
        let user = await this.userService.createUser(name);
        await this.assignIssues();
        return this.userService.getUser(user.id);
    }

    public async createAgent(name: string): Promise<Agent> {
        let agent = await this.agentService.createAgent(name);
        await this.assignIssues();
        return this.agentService.getAgent(agent.id);
    }

    public async getAgentList(state?: AgentState): Promise<Array<Agent>> {
        return await this.agentService.getAgentList(state);
    }

    public async getAgent(id: string): Promise<Agent> {
        return await this.agentService.getAgent(id);
    }

    public async createIssue(title: string, description: string, userId: string): Promise<Issue> {
        let user = await this.userService.getUser(userId);
        let issue = await this.issueService.createIssue(title, description, user);
        await this.assignIssues();
        return this.issueService.getIssue(issue.id);
    }

    public async getIssue(filter: IssueFilter): Promise<Array<Issue>> {
        return await this.issueService.getIssueList(filter);
    }

    public async resolveIssue(issueId: string) {
        let issue = await this.issueService.getIssue(issueId);
        let agent = await this.agentService.getAgent(issue.agentId);
        await this.issueService.changeIssueState(issueId, IssueState.RESOLVED);
        await this.agentService.setState(agent.id, AgentState.FREE);
    }


    protected async assignIssues(): Promise<void> {
        let freeAgents = await this.agentService.getAgentList(AgentState.FREE);
        let unsignedIssues = await this.issueService.getIssueList({ state: IssueState.UNASSIGNED });
        if (freeAgents.length > 0 && unsignedIssues.length > 0) {
            for (let agent of freeAgents) {
                if (unsignedIssues.length < 1)
                    break;

                await this.issueService.assignIssue(agent.id, unsignedIssues.pop().id);
                await this.agentService.setState(agent.id, AgentState.BUSY);
            }
        }
    }
}
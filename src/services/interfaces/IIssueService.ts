import { IssueFilter, Issue, IssueState } from "../../model/Issue";
import { User } from "../../model/User";

export interface IIssueService {
    createIssue(title: string, description: string, user: User): Promise<Issue>;
    getIssue(id: string): Promise<Issue>;
    getIssueList(filter: IssueFilter): Promise<Array<Issue>>;
    changeIssueState(issueId: string, state: IssueState);
    assignIssue(agentId: string, issueId: string): Promise<void>;
}
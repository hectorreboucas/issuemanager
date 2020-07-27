import { Collection, ObjectId, Db } from "mongodb";
import { Issue, IssueFilter, IssueState } from "../model/Issue";
import { IIssueService } from "./interfaces/IIssueService";
import { User } from "../model/User";

export class IssueService implements IIssueService {

    private collection: Collection<Issue>;

    constructor(db: Db) {
        this.collection = db.collection<Issue>("issue");
    }

    async createIssue(title: string, description: string, user: User): Promise<Issue> {
        let issue = new Issue();
        issue.title = title;
        issue.description = description;
        issue.userId = user.id;
        issue.state = IssueState.UNASSIGNED;
        issue.createdAt = new Date();
        await this.collection.insertOne(issue);
        let _id = (issue as any)._id as ObjectId;
        issue.id = _id.toString();
        await this.collection.updateOne({ _id }, { $set: issue });
        return issue;
    }

    async getIssue(id: string): Promise<Issue> {
        return await this.collection.findOne({ id });
    }

    async getIssueList(filter: IssueFilter): Promise<Issue[]> {
        return await this.collection.find(filter).toArray();
    }

    async changeIssueState(issueId: string, state: IssueState) {
        await this.collection.updateOne({ id: issueId }, { $set: { state, resolvedAt: new Date() } });
    }

    async assignIssue(agentId: string, issueId: string): Promise<void> {
        await this.collection.updateOne({ id: issueId }, { $set: { agentId: agentId, state: IssueState.ASSIGNED, assignedAt: new Date() } });
    }
}
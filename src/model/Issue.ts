export class Issue {
    id: string;
    title: string;
    description: string;
    state: IssueState;
    userId: string;
    agentId: string;
    createdAt: Date;
    assignedAt: Date;
    resolvedAt: Date;
}

export enum IssueState {
    UNASSIGNED = "UNASSIGNED",
    ASSIGNED = "ASSIGNED",
    RESOLVED = "RESOLVED"
}

export class IssueFilter {
    state?: IssueState;
    userId?: string;
    agentId?: string;
}
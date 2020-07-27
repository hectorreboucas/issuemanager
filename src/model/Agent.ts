export enum AgentState {
    FREE = "FREE",
    BUSY = "BUSY"
}

export class Agent {
    id: string;
    name: string;
    state: AgentState;
}
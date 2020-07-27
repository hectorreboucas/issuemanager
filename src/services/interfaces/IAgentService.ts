import { AgentState, Agent } from "../../model/Agent";

export interface IAgentService {
    createAgent(name: string): Promise<Agent>;
    setState(agentId: string, state: AgentState): Promise<void>;
    getAgent(id: string): Promise<Agent>;
    getAgentList(state?: AgentState): Promise<Array<Agent>>;
}
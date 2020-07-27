import { IAgentService } from "./interfaces/IAgentService";
import { AgentState, Agent } from "../model/Agent";
import { Collection, ObjectId, Db } from "mongodb";


export class AgentService implements IAgentService {

    private collection : Collection<Agent>;

    constructor(db: Db) {
        this.collection = db.collection<Agent>("agent");
    }

    async createAgent(name: string): Promise<Agent> {
        let agent = new Agent();
        agent.name = name;
        agent.state = AgentState.FREE;
        await this.collection.insertOne(agent);
        let _id = (agent as any)._id as ObjectId;
        agent.id = _id.toString();
        await this.collection.updateOne({_id}, {$set: agent});
        return agent;
    }

    async setState(agentId: string, state: AgentState): Promise<void> {
        await this.collection.update({id: agentId}, {$set: {state}})
    }

    async getAgent(id: string): Promise<Agent> {
        return await this.collection.findOne({id});
    }

    async getAgentList(state?: AgentState): Promise<Agent[]> {
        let filter : any = {};
        if(state)
            filter.state = state;
        return this.collection.find(filter).toArray();
    }

}
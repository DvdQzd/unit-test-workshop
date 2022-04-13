import { GameServer } from "src/domain/GameServer";

export class GetServersUsecase {
    constructor (private readonly gameServers: GameServer[]) {}

    async getServers(): Promise<GameServer[]> {
        return this.gameServers;
    }
}
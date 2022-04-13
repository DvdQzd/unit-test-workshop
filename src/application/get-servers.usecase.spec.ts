import { GameServer } from "../domain/GameServer";
import { GetServersUsecase } from "./get-servers.usecase";

describe('GetServersUsecase', () => {
    let usecase: GetServersUsecase;
    let gameServers: GameServer[];

    it('should return game servers', async () => {
        gameServers = [
            new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 0, "online", new Date(), new Date()),
            new GameServer(2, "Game Server 2", "271.0.0.2", 3000, [], 0, "online", new Date(), new Date()),
            new GameServer(3, "Game Server 3", "271.0.0.3", 3000, [], 10, "online", new Date(), new Date()),
        ];
        usecase = new GetServersUsecase(gameServers);
        const response = await usecase.getServers();
        expect(response).toEqual(gameServers);
    });
})
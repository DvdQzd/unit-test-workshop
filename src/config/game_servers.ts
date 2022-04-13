/* istanbul ignore file */

import { GameServer } from "src/domain/GameServer";

export const gameServers: GameServer[] = [
    new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 10, "online", new Date(), new Date()),
    new GameServer(2, "Game Server 2", "271.0.0.2", 3000, [], 10, "online", new Date(), new Date()),
    new GameServer(3, "Game Server 3", "271.0.0.3", 3000, [], 10, "online", new Date(), new Date()),
    new GameServer(4, "Game Server 4", "271.0.0.4", 3000, [], 10, "online", new Date(), new Date()),
    new GameServer(5, "Game Server 5", "271.0.0.5", 3000, [], 10, "online", new Date(), new Date()),
];

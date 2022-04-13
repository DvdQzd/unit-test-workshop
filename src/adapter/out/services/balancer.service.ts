import { GameServer } from "src/domain/GameServer";
import { User } from "src/domain/User";

export class BalancerService {
    async assignUserToServer(user: User, gameServer: GameServer): Promise<string> {
        gameServer.connectedUsers.push(user);
        return `${user.id} is assigned to server ${gameServer.name} at ${gameServer.ipAddress}`;
    }
}
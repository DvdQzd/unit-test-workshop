import { GameServer } from "src/domain/GameServer";
import { User } from "src/domain/User";

export abstract class BalancerOutPort {
    abstract assignUserToServer(user: User, server: GameServer): Promise<string>;
}

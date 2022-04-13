import { GameServerDTO } from "./game_server.dto";
import { UserDTO } from "./user.dto";

export abstract class BalancerInPort {
    abstract assignUserToServer(user: UserDTO): Promise<string>;
    abstract getServers(): Promise<GameServerDTO[]>;
}
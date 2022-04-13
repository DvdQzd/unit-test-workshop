import { BalancerOutPort } from "src/adapter/out/balancer-out.port";
import { GameServer } from "src/domain/GameServer";
import { User } from "src/domain/User";

export class BalancerUseCase {
    constructor(
        private readonly balancerOutPort: BalancerOutPort,
        private readonly gameServers: GameServer[],
        private readonly bannedIpAddresses: string[]
    ) {}

    async assignUserToServer(user: User): Promise<string> {
        if(this.bannedIpAddresses.includes(user.ipAddress)) {
            return `${user.id} is banned from server`;
        }
        const server = this.gameServers.find(gameServer => gameServer.connectedUsers.length < gameServer.maxUsers);
        if (server) return await this.balancerOutPort.assignUserToServer(user, server);
    
        return 'No available server';
    }
































    // async assignUserToServer(user: User): Promise<string> {
    //     let server: GameServer;

    //     if(this.bannedIpAddresses.includes(user.ipAddress)) {
    //         const lastServer = this.gameServers[this.gameServers.length - 1];
    //         if(lastServer?.connectedUsers.length < lastServer.maxUsers) server = lastServer;
    //     } else {
    //         server = this.gameServers.find(gameServer => gameServer.connectedUsers.length < gameServer.maxUsers);
    //     }
    //     if (server) return await this.balancerOutPort.assignUserToServer(user, server);
    
    //     return 'No available server';
    // }
}
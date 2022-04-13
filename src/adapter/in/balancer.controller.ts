import { Body, Controller, Get, Post } from "@nestjs/common";
import { BalancerInPort } from "./balancer-in.port";
import { GameServerDTO } from "./game_server.dto";
import { UserDTO } from "./user.dto";

@Controller('/api/v1/balancer')
export class BalancerController {
    constructor (private readonly balancerInPort: BalancerInPort) {}

    @Post('user')
    async assignUserToServer(@Body('user') user: UserDTO): Promise<string> {
        return await this.balancerInPort.assignUserToServer(user);
    }

    @Get('server')
    async getServers(): Promise<GameServerDTO[]> {
        return await this.balancerInPort.getServers();
    }
}
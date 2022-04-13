import { Injectable } from "@nestjs/common";
import { GameServer } from "../../domain/GameServer";
import { User } from "../../domain/User";
import { BalancerService } from "./services/balancer.service";
import { BalancerOutPort } from "./balancer-out.port";

@Injectable()
export class BalancerAdapter implements BalancerOutPort {
    constructor (private readonly balancerService: BalancerService) {}

    async assignUserToServer(user: User, server: GameServer): Promise<string> {
        return await this.balancerService.assignUserToServer(user, server);
    }
}

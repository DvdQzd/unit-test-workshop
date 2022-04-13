import { BalancerInPort } from "src/adapter/in/balancer-in.port";
import { User } from "src/domain/User";
import { BalancerUseCase } from "./balancer.usecase";
import { GetServersUsecase } from "./get-servers.usecase";

export class BalancerFacade implements BalancerInPort {
    constructor(
        private readonly balancerUseCase: BalancerUseCase,
        private readonly getServersUsecase: GetServersUsecase
    ) { }
    
    async assignUserToServer(user: User): Promise<string> {
        return await this.balancerUseCase.assignUserToServer(user);
    }
    async getServers(): Promise<any[]> {
        return await this.getServersUsecase.getServers();
    }
}
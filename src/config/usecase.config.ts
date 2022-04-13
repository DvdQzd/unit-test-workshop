import { Provider } from "@nestjs/common";
import { GetServersUsecase } from "../application/get-servers.usecase";
import { BalancerInPort } from "../adapter/in/balancer-in.port";
import { BalancerOutPort } from "../adapter/out/balancer-out.port";
import { BalancerFacade } from "../application/balancer.facade";
import { BalancerUseCase } from "../application/balancer.usecase";
import { BalancerService } from "../adapter/out/services/balancer.service";
import { bannedIpAddresses } from "./banned_users";
import { gameServers } from "./game_servers";

const usecaseConfig: Provider[] = [
    BalancerService,
    {
        provide: BalancerUseCase,
        inject: [BalancerOutPort],
        useFactory: (balancerOutPort: BalancerOutPort) => new BalancerUseCase(balancerOutPort, gameServers, bannedIpAddresses)
    },
    {
        provide: GetServersUsecase,
        inject: [],
        useFactory: () => new GetServersUsecase(gameServers)
    },
    {
        provide: BalancerInPort,
        inject: [BalancerUseCase, GetServersUsecase],
        useFactory: (balancerUseCase: BalancerUseCase, getServersUsecase: GetServersUsecase) => new BalancerFacade(balancerUseCase, getServersUsecase)
    }
];

export default usecaseConfig;
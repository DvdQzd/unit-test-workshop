import { Provider } from "@nestjs/common";
import { BalancerOutPort } from "src/adapter/out/balancer-out.port";
import { BalancerAdapter } from "src/adapter/out/balancer.adapter";
import { BalancerService } from "src/adapter/out/services/balancer.service";

const adapterConfig: Provider[] = [
    {
        provide: BalancerOutPort,
        inject: [BalancerService],
        useFactory: (balancerService: BalancerService) => new BalancerAdapter(balancerService)
    },
];

export default adapterConfig;

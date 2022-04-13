import { Module } from "@nestjs/common";
import { BalancerController } from "src/adapter/in/balancer.controller";
import adapterConfig from "./adapter.config";
import usecaseConfig from "./usecase.config";

@Module({
    controllers: [BalancerController],
    providers: [...adapterConfig, ...usecaseConfig],
})
export class AppModule {}

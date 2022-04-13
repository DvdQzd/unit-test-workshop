import { User } from "../../../domain/User";
import * as faker from 'faker';
import { GameServer } from "../../../domain/GameServer";
import { BalancerService } from "./balancer.service";

describe('BalancerService', () => {
    it('should return assigned message', async () => {
        const user = newUser();
        const gameServer = new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 0, "online", new Date(), new Date());
        const service = new BalancerService();
        const message = await service.assignUserToServer(user, gameServer);
        expect(message).toContain(user.id);
        expect(message).toContain(gameServer.name);
        expect(message).toContain(gameServer.ipAddress);
    })
})

const newUser = (): User => {
    const user = new User();
    user.id = faker.datatype.uuid();
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
}
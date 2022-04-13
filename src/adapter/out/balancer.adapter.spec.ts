import { GameServer } from "../../domain/GameServer";
import { User } from "../../domain/User";
import { BalancerService } from "./services/balancer.service";
import * as faker from 'faker'
import { BalancerAdapter } from "./balancer.adapter";

describe('BalancerAdapter', () => {
    let service: BalancerService;
    let adapter: BalancerAdapter;
    beforeEach(() => {
        service = new BalancerService();
        adapter = new BalancerAdapter(service);
    });

    it('should return assigned message', async () => {
        const user = newUser();
        const assignUserToServerSpy = jest.spyOn(service, 'assignUserToServer');
        assignUserToServerSpy.mockResolvedValue(`${user.id} is assigned to server Game Server 1 at 271.0.0.1`);
        const gameServer = new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 0, "online", new Date(), new Date());
        const message = await adapter.assignUserToServer(user, gameServer);
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

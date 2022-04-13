import { BalancerOutPort } from "../adapter/out/balancer-out.port";
import { GameServer } from "../domain/GameServer";
import { BalancerUseCase } from "./balancer.usecase";
import * as td from 'testdouble';
import * as faker from 'faker';
import { User } from "../domain/User";

describe('BalancerUseCase', () => {
    let useCase: BalancerUseCase;
    let outPort: BalancerOutPort;
    let gameServers: GameServer[];
    let bannedIpAddresses: string[];

    beforeEach(() => {
        outPort = td.object<BalancerOutPort>();
        bannedIpAddresses = ["271.0.0.1", "271.0.0.2"];
    });

    describe('assignUserToServer', () => {
        it('should return a string with the server ip', async () => {
            const user = newUser();
            const assignUserToServerSpy = jest.spyOn(outPort, 'assignUserToServer');
            assignUserToServerSpy.mockResolvedValue(`${user.id} is assigned to server Game Server 2 at 271.0.0.2`);
            gameServers = [
                new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 0, "online", new Date(), new Date()),
                new GameServer(2, "Game Server 2", "271.0.0.2", 3000, [], 2, "online", new Date(), new Date()),
                new GameServer(3, "Game Server 3", "271.0.0.3", 3000, [], 10, "online", new Date(), new Date()),
            ];
            useCase = new BalancerUseCase(outPort, gameServers, bannedIpAddresses);
            
            const serverIp = await useCase.assignUserToServer(user);
            expect(assignUserToServerSpy).toHaveBeenCalledWith(user, gameServers[1]);
            expect(serverIp).toContain(gameServers[1].name);
            expect(serverIp).toContain(gameServers[1].ipAddress);
        });

        it('should return a user banned message', async () => {
            const user = newUser();
            user.ipAddress = bannedIpAddresses[0];
            gameServers = [
                new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 0, "online", new Date(), new Date()),
                new GameServer(2, "Game Server 2", "271.0.0.2", 3000, [], 0, "online", new Date(), new Date()),
                new GameServer(3, "Game Server 3", "271.0.0.3", 3000, [], 10, "online", new Date(), new Date()),
            ];
            useCase = new BalancerUseCase(outPort, gameServers, bannedIpAddresses);

            const serverIp = await useCase.assignUserToServer(user);
            expect(serverIp).toEqual(`${user.id} is banned from server`);
        });

        it('should return a no available server message', async () => {
            const user = newUser();
            const assignUserToServerSpy = jest.spyOn(outPort, 'assignUserToServer');
            gameServers = [
                new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [], 0, "online", new Date(), new Date()),
                new GameServer(2, "Game Server 2", "271.0.0.2", 3000, [], 0, "online", new Date(), new Date()),
                new GameServer(3, "Game Server 3", "271.0.0.3", 3000, [], 0, "online", new Date(), new Date()),
            ];
            useCase = new BalancerUseCase(outPort, gameServers, bannedIpAddresses);

            const serverIp = await useCase.assignUserToServer(user);
            expect(assignUserToServerSpy).toHaveBeenCalledTimes(0);
            expect(serverIp).toEqual('No available server');
        });

        it('should return error if user is already connected to a server', async () => {
            const user = newUser();
            gameServers = [
                new GameServer(1, "Game Server 1", "271.0.0.1", 3000, [user], 10, "online", new Date(), new Date()),
                new GameServer(2, "Game Server 2", "271.0.0.2", 3000, [], 0, "online", new Date(), new Date()),
                new GameServer(3, "Game Server 3", "271.0.0.3", 3000, [], 10, "online", new Date(), new Date()),
            ];
            useCase = new BalancerUseCase(outPort, gameServers, bannedIpAddresses);

            expect(await useCase.assignUserToServer(user)).rejects.toThrow('User is already connected to a server');
        });

    });

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
})
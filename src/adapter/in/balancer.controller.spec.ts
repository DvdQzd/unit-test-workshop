import * as td from 'testdouble';
import * as faker from 'faker';
import { BalancerInPort } from './balancer-in.port';
import { BalancerController } from './balancer.controller';
import { UserDTO } from './user.dto';
import { bannedIpAddresses } from '../../config/banned_users';

describe('BalancerController', () => {
    let port: BalancerInPort;
    let controller: BalancerController;

    beforeEach(() => {
        port = td.object<BalancerInPort>();
    })

    describe('assignUserToServer', () => {
        it('should return a string with the server ip', async () => {
            const user = newUser();
            const assignUserToServerSpy = jest.spyOn(port, 'assignUserToServer');
            assignUserToServerSpy.mockResolvedValue(`${user.id} is assigned to server Game Server 3 at 271.0.0.3`);
            controller = new BalancerController(port);

            const serverIp = await controller.assignUserToServer(user);
            expect(serverIp).toContain("Game Server 3");
            expect(serverIp).toContain("271.0.0.3");
        });

        it('should return a user banned message', async () => {
            const user = newUser();
            user.ipAddress = bannedIpAddresses[0];
            const assignUserToServerSpy = jest.spyOn(port, 'assignUserToServer');
            assignUserToServerSpy.mockResolvedValue(`${user.id} is banned from server`);
            controller = new BalancerController(port);

            const serverIp = await controller.assignUserToServer(user);
            expect(serverIp).toEqual(`${user.id} is banned from server`);
        });

        it('should return a no available server message', async () => {
            const user = newUser();
            const assignUserToServerSpy = jest.spyOn(port, 'assignUserToServer');
            assignUserToServerSpy.mockResolvedValue('No available server');
            controller = new BalancerController(port);

            const serverIp = await controller.assignUserToServer(user);
            expect(serverIp).toEqual('No available server');
        });
    });

    describe('getUserServers', () => {
        it('should return a list of servers', async () => {
            const getServersSpy = jest.spyOn(port, 'getServers');
            getServersSpy.mockResolvedValue([{
                id: 1,
                name: 'Game Server 1',
                ipAddress: '271.0.0.1',
                port: 3000,
                connectedUsers: [],
                maxUsers: 0,
                status: 'online',
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                id: 2,
                name: 'Game Server 2',
                ipAddress: '271.0.0.2',
                port: 3000,
                connectedUsers: [],
                maxUsers: 8,
                status: 'online',
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
            
            controller = new BalancerController(port);

            const serversResponse = await controller.getServers();
            expect(getServersSpy).toHaveBeenCalled();
            expect(serversResponse).toHaveLength(2);
            expect(serversResponse[0].name).toEqual('Game Server 1');
            expect(serversResponse[1].name).toEqual('Game Server 2');
        })
    })
});

const newUser = (): UserDTO => {
    const user = {
        id: faker.datatype.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return user;
}
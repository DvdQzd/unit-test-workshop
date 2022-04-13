import { User } from "./User";

export class GameServer {
    constructor(
        public id: number,
        public name: string,
        public ipAddress: string,
        public port: number,
        public connectedUsers: User[],
        public maxUsers: number,
        public status: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) { }
}
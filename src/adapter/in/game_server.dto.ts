import { UserDTO } from "./user.dto";

export interface GameServerDTO {
    id: number;
    name: string;
    ipAddress: string;
    port: number;
    connectedUsers: UserDTO[];
    maxUsers: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
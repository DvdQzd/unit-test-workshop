export interface UserDTO {
    id: number;
    ipAddress?: string;
    username: string;
    password?: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}
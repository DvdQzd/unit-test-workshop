export class User {
    constructor(
        public id?: number,
        public ipAddress?: string,
        public username?: string,
        public password?: string,
        public email?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) { }
}
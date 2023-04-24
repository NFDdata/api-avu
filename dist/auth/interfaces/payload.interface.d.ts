import { User } from '../../users/schema/user.schema';
export type UserPayload = {
    userId: string;
    user: User;
};
export type Payload = {
    user: UserPayload;
};
export type AuthUser = {
    id: string;
    name: string;
    email: string;
};

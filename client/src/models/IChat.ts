import { IUser } from "./IUser";

export interface IChat {
    user1: IUser;
    user2: IUser;
    messages: [{ content: string, senderId: string, date: Date }];
}
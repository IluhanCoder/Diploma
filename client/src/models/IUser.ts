import { IEvent } from "./IEvent";
import { ITicket } from "./IProposition";

export interface IUser {
  login: string;
  email: string;
  birthday: Date;
  cell: string;
  city: string;
  gender: string;
  avatar: string;
  isActivated: boolean;
  _id: string;
  eventInvites: Array<IEvent>;
  eventPropositions: Array<ITicket>;
}

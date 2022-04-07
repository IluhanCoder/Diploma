export interface IEvent {
  _id: string;
  creatorName: string;
  creatorId: string;
  name: string;
  desc: String;
  genres: [String];
  date: Date;
  adress: string;
  participants: [String];
  creator: String;
  avatar: string;
  isSubmited: boolean;
}

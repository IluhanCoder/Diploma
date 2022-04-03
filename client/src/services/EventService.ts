import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IEvent } from "../models/IEvent";
import { runInNewContext } from "vm";

export default class EventService {
  static async fetchEvents(): Promise<AxiosResponse<IEvent[]>> {
    return $api.get("/events");
  }

  static async fetchUserEvents(
    creator: string
  ): Promise<AxiosResponse<IEvent[]>> {
    return $api.post("/user-events", { creator });
  }

  static async createEvent(
    name: string,
    creatorId: string,
    desc: string,
    genres: string[],
    date: Date,
    adress: string,
    participants: string[],
    avatar: File
  ): Promise<AxiosResponse<IEvent[]>> {
    return $api
      .post("/events", {
        name,
        creatorId,
        desc,
        genres,
        date,
        adress,
        participants,
      })
      .then((res) => {
        const data = res.data;
        EventService.setAvatar(data, avatar);
        return data;
      });
  }

  static async findEvent(searchValue: string, searchType: string) {
    return $api.post("/events-find", { searchValue, searchType });
  }

  static async setAvatar(event: IEvent, avatar: File) {
    const data = new FormData();
    data.append("file", avatar);
    //TODO: make by id stupid
    return $api.post("/event-avatar/:" + event.name, data);
  }

  static getById(id: string) {
    return $api.get("/event/:" + id);
  }
}

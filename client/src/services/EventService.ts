import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IEvent } from "../models/IEvent";
import { runInNewContext } from "vm";

export default class EventService {
  static async createEvent(
    name: string,
    creatorId: string,
    desc: string,
    rider: string,
    genres: string[],
    date: Date,
    adress: string,
    avatar: File,
    musiciansNeeded: string[]
  ): Promise<AxiosResponse<IEvent[]>> {
    return $api
      .post("/event", {
        name,
        creatorId,
        desc,
        rider,
        genres,
        date,
        adress,
        musiciansNeeded,
      })
      .then((res) => {
        const data = res.data;
        EventService.setAvatar(data, avatar);
        return data;
      });
  }

  static async getEvents(
    isSubmited: boolean
  ): Promise<AxiosResponse<IEvent[]>> {
    return await $api.get<IEvent[]>(`/events/${isSubmited}`);
  }

  static async getEvent(eventId: string) {
    return await $api.get<IEvent>(`/event/${eventId}`);
  }

  static async getUserEvents(userId: string): Promise<AxiosResponse<IEvent[]>> {
    return await $api.get(`/user-events/${userId}`);
  }

  static async setAvatar(event: IEvent, avatar: File) {
    const data = new FormData();
    data.append("file", avatar);
    return $api.post("/event-avatar/:" + event._id, data);
  }

  static getById(id: string) {
    return $api.get("/event/:" + id);
  }

  static async deleteEvent(eventId: string) {
    $api.delete("/event/" + eventId);
  }

  static async submitEvent(eventId: string) {
    return $api.put(`/event-submit/${eventId}`);
  }
}

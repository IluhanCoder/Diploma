import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { ITicket } from "../models/IProposition";

export default class UserService {
  static getUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get("/users");
  }

  static changeAvatar(fileData: File): void {
    const data = new FormData();
    data.append("file", fileData);
    $api.post("/avatar", data).catch((err) => console.log(err));
  }

  static deleteUserById(userId: string) {
    $api.delete("/user/" + userId);
  }

  static getById(userId: string) {
    return $api.get("/users/:" + userId);
  }

  static getAvatar(id: string) {
    return $api.get("/avatar/:" + id);
  }

  static removeInvite(event: IEvent, userId: string) {
    return $api.post("/event-invite-remove/" + userId, { event });
  }

  static update(
    user: IUser,
    login: string,
    email: string,
    cell: string,
    city: string,
    gender: string
  ): void {
    $api.put("/user", { login, email, cell, city, gender });
  }

  static sendInvite(eventId: string, userId: string) {
    const event = $api.get("/event/" + eventId).then((result) => {
      const event = result.data;
      $api.post("/event-invite", { event, userId });
    });
  }

  static async sendProposition(eventId: string, userId: string, role: string) {
    return await $api.post("/event-proposition/", { eventId, userId, role });
  }

  static async getPropositionData(propositions: Array<ITicket>) {
    console.log(propositions);
    return await $api.post("/propositions/", { propositions });
  }

  static isAdmin(user: IUser) {
    return user.login == "ADMIN";
  }
}

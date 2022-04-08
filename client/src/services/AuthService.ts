import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IEvent } from "../models/IEvent";

export default class AuthService {
  static async loginF(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/login", { email, password });
  }

  static async registration(
    login: string,
    email: string,
    password: string,
    birthday: Date,
    cell: string,
    city: string,
    gender: string,
    eventInvites: Array<IEvent>
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/registration", {
      login: login,
      email,
      password,
      birthday,
      cell,
      city,
      gender,
      avatar: null,
      eventInvites: [],
    });
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}

import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
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

  static sendInvite(userId: string, eventId: string) {
    $api.post("/event-invite", { userId, eventId });
  }
}

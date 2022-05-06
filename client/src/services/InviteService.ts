import $api from "../http";
import { ITicket } from "../models/IProposition";

export default class InviteService {
  static async newInvite(
    proposerId: string,
    receiverId: string,
    eventId: string,
    role: string,
    comment: string
  ) {
    await $api.post("/event-invite", {
      proposerId,
      receiverId,
      eventId,
      role,
      comment,
    });
  }

  static async getInvites(userId: string) {
    console.log(userId);
    // return await $api.get("/propositions/" + userId);
  }
}

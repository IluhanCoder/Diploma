import $api from "../http";
import { ITicket } from "../models/IProposition";

export default class PropositionService {
  static async eventPropose(
    proposerId: string,
    receiverId: string,
    eventId: string,
    role: string,
    comment: string
  ) {
    await $api.post("/event-propose", {
      proposerId,
      receiverId,
      eventId,
      role,
      comment,
    });
  }

  static async getPropositions(userId: string) {
    console.log(userId);
    // return await $api.get("/propositions/" + userId);
  }
}

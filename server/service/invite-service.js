const Mongoose = require("mongoose");
const inviteModel = require("../models/ticket-children/invite-model");

class InviteService {
  async newInvite(proposerId, receiverId, eventId, role, date, comment) {
    const candidate = await inviteModel.findOne({ proposerId, eventId });
    if (candidate != null)
      throw ApiError.BadRequest("Ви вже запросили користувача на цю подію");
    const invite = await inviteModel.create({
      proposerId,
      receiverId,
      eventId,
      role,
      date,
      comment,
    });
    return invite;
  }

  async getUserInvites(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const invites = await inviteModel.aggregate([
      { $match: { receiverId: convertedUserId } },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
    ]);
    return invites;
  }

  async seeInvite(inviteId, accept) {
    const invite = await inviteModel.findById(inviteId);
    if (accept) {
      const proposer = await userModel
        .findOne({ _id: invite.proposerId.toString() })
        .catch(console.error);
      await eventModel.updateOne(
        { _id: invite.eventId.toString() },
        { $push: { participants: proposer.login } }
      );
    }
    await inviteModel.deleteOne({ id: invite._id });
  }
}

module.exports = new InviteService();

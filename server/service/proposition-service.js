const Mongoose = require("mongoose");
const ApiError = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const ticketModel = require("../models/ticket-model");
const userModel = require("../models/user-model");

class propositionService {
  async newProposition(senderId, receiverId, eventId, role, date, comment) {
    const candidate = await ticketModel.findOne({ senderId, eventId });
    if (candidate != null)
      throw ApiError.BadRequest("Ви вже надіслали пропозицію для цієї події");
    const proposition = await ticketModel.create({
      senderId,
      receiverId,
      eventId,
      role,
      date,
      comment,
      type: "proposition",
    });
    return proposition;
  }

  async getUserPropositions(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const propositions = await ticketModel.aggregate([
      { $match: { receiverId: convertedUserId, type: "proposition" } },
      {
        $lookup: {
          from: "users",
          localField: "senderId",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $lookup: {
          from: "events",
          localField: "eventId",
          foreignField: "_id",
          as: "event",
        },
      },
      { $unwind: "$event" },
    ]);
    return propositions;
  }

  async getProposition(receiverId, senderId) {
    const proposition = await ticketModel.findOne({
      receiverId,
      senderId,
      type: "proposition",
    });
    return proposition;
  }

  async seeProposition(propositionId, accept) {
    const proposition = await ticketModel.findById(propositionId);
    const receiver = await userModel.findById(proposition.senderId);
    if (accept) {
      const convertedReceiverId = Mongoose.Types.ObjectId(
        proposition.receiverId
      );
      await eventModel.updateOne(
        { _id: proposition.eventId.toString() },
        {
          $push: {
            participants: {
              id: convertedReceiverId,
              name: receiver.name,
              role: proposition.role,
              rights: 4,
            },
          },
        }
      );
    }
    await ticketModel.deleteOne({ _id: proposition._id });
  }
}

module.exports = new propositionService();

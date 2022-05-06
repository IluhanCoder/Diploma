const Mongoose = require("mongoose");
const ApiError = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const propositionModel = require("../models/ticket-children/proposition-model");
const PropositionModel = require("../models/ticket-children/proposition-model");
const userModel = require("../models/user-model");

class propositionService {
  async newProposition(proposerId, receiverId, eventId, role, date, comment) {
    const candidate = await PropositionModel.findOne({ proposerId, eventId });
    if (candidate != null)
      throw ApiError.BadRequest("Ви вже надіслали пропозицію для цієї події");
    const proposition = await PropositionModel.create({
      proposerId,
      receiverId,
      eventId,
      role,
      date,
      comment,
    });
    return proposition;
  }

  async getUserPropositions(userId) {
    const convertedUserId = Mongoose.Types.ObjectId(userId);
    const propositions = await PropositionModel.aggregate([
      { $match: { receiverId: convertedUserId } },
      {
        $lookup: {
          from: "users",
          localField: "proposerId",
          foreignField: "_id",
          as: "proposer",
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
    return propositions;
  }

  async seeProposition(propositionId, accept) {
    const proposition = await propositionModel.findById(propositionId);
    if (accept) {
      const proposer = await userModel
        .findOne({ _id: proposition.proposerId.toString() })
        .catch(console.error);
      await eventModel.updateOne(
        { _id: proposition.eventId.toString() },
        { $push: { participants: proposer.login } }
      );
    }
    await propositionModel.deleteOne({ id: proposition._id });
  }
}

module.exports = new propositionService();

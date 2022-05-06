const Mongoose = require("mongoose");
const { BadRequest } = require("../exceptions/api-error");
const eventModel = require("../models/event-model");
const EventModel = require("../models/event-model");
const userModel = require("../models/user-model");

class EventService {
  async addEvent(
    name,
    creatorId,
    desc,
    rider,
    genres,
    date,
    adress,
    participants,
    musiciansNeeded,
    avatar
  ) {
    const event = await EventModel.create({
      name,
      creatorId,
      desc,
      rider,
      genres,
      date,
      adress,
      participants,
      musiciansNeeded,
      comments: [],
    });
    return event;
  }

  async getById(eventId) {
    const convertedId = Mongoose.Types.ObjectId(eventId);
    const event = await EventModel.aggregate([
      { $match: { _id: convertedId } },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator",
      },
      {
        $unwind: {
          path: "$participants",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "participants.id",
          foreignField: "_id",
          as: "participantData",
        },
      },
      {
        $unwind: "$participantData",
      },
      {
        $addFields: {
          participant: {
            _id: "$participants.id",
            name: "$participantData.login",
            role: "$participants.role",
            rights: "$participants.rights",
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name",
          },
          creator: {
            $first: "$creator",
          },
          desc: {
            $first: "$desc",
          },
          rider: {
            $first: "$rider",
          },
          genres: {
            $first: "$genres",
          },
          date: {
            $first: "$date",
          },
          adress: {
            $first: "$adress",
          },
          avatar: {
            $first: "$avatar",
          },
          songs: {
            $first: "$songs",
          },
          musiciansNeeded: {
            $first: "$musiciansNeeded",
          },
          usSubmited: {
            $first: "$isSubmited",
          },
          participants: {
            $push: "$participant",
          },
        },
      },
    ]);
    //i have no time to fix it :)
    return event[0];
  }

  async deleteById(eventId) {
    const res = await EventModel.deleteOne({ _id: eventId });
    return res;
  }

  async getEvents(isSubmited) {
    try {
      const events = await EventModel.aggregate([
        { $match: { isSubmited } },
        {
          $lookup: {
            from: "users",
            localField: "creatorId",
            foreignField: "_id",
            as: "creator",
          },
        },
        { $unwind: "$creator" },
      ]);
      return events;
    } catch (error) {
      throw error;
    }
  }

  async getUserEvents(userId) {
    try {
      const convertedUserId = Mongoose.Types.ObjectId(userId);
      const events = await EventModel.aggregate([
        { $match: { creatorId: convertedUserId } },
        {
          $lookup: {
            from: "users",
            localField: "creatorId",
            foreignField: "_id",
            as: "creator",
          },
        },
        { $unwind: "$creator" },
      ]);
      return events;
    } catch (error) {
      throw error;
    }
  }

  async setAvatar(filePath, eventId) {
    const filter = { _id: eventId };
    let fileStr = filePath.replace("images\\", "");
    const updateDocument = {
      $set: {
        avatar: fileStr,
      },
    };
    const result = await EventModel.updateOne(filter, updateDocument);
    return result;
  }

  async submitEvent(eventId) {
    const filter = { _id: eventId };
    const updateDocument = {
      $set: {
        isSubmited: true,
      },
    };
    const result = await EventModel.updateOne(filter, updateDocument);
  }

  async addComment(content, commenterId, commenterName, eventId) {
    const currentDate = new Date();
    const comment = {
      commenterId,
      date: currentDate,
      content,
      eventId,
      commenterName,
    };
    await eventModel.updateOne(
      { _id: eventId },
      { $push: { comments: comment } }
    );
  }

  async deleteComment(eventId, commentIndex) {
    const event = await eventModel.findById(eventId);
    let comments = event.comments;
    comments.splice(commentIndex, 1);
    await eventModel.updateOne(
      { _id: eventId },
      { $set: { comments: comments } }
    );
  }
}

module.exports = new EventService();

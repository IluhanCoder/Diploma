const { BadRequest } = require("../exceptions/api-error");
const EventModel = require("../models/event-model");

class EventService {
  async addEvent(
    name,
    creatorId,
    creatorName,
    desc,
    genres,
    date,
    adress,
    participants,
    avatar
  ) {
    const event = await EventModel.create({
      name,
      creatorId,
      creatorName,
      desc,
      genres,
      date,
      adress,
      participants,
    });
    return event;
  }

  async getAllEvents() {
    try {
      const events = await EventModel.find();
      return events;
    } catch (error) {
      throw error;
    }
  }

  async getUserEvents(creatorId) {
    try {
      const events = await EventModel.find({ creatorId });
      return events;
    } catch (error) {
      throw error;
    }
  }

  async findEvent(searchValue, searchType) {
    let event = [];
    switch (searchType) {
      case "name":
        event = await EventModel.find({ name: { $regex: searchValue } });
        break;
      case "creator":
        event = await EventModel.find({ creator: { $regex: searchValue } });
        break;
      case "genre":
        event = await EventModel.find({ genres: searchValue });
        break;
      case "participant":
        event = await EventModel.find({ participants: searchValue });
        break;
      case "adress":
        event = await EventModel.find({ adress: { $regex: searchValue } });
        break;
      case "date":
        event = await EventModel.find({ date: { $regex: searchValue } });
    }
    return event;
  }

  async setAvatar(filePath, eventName) {
    const filter = { name: eventName };
    let fileStr = filePath.replace("images\\", "");
    const updateDocument = {
      $set: {
        avatar: fileStr,
      },
    };
    const result = await EventModel.updateOne(filter, updateDocument);
    return result;
  }
}

module.exports = new EventService();

const eventModel = require("../models/event-model");
const EventService = require("../service/event-service");
const userService = require("../service/user-service");

class EventController {
  async addEvent(req, res, next) {
    const creator = await userService.getById(req.body.creatorId);
    console.log(creator.login);
    try {
      const { name, creatorId, desc, genres, date, adress, participants } =
        req.body;
      const creator = await userService.getById(creatorId);
      const creatorName = creator.login;
      const event = await EventService.addEvent(
        name,
        creatorId,
        creatorName,
        desc,
        genres,
        date,
        adress,
        participants
      );
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const events = await EventService.getAllEvents();
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async getUserEvents(req, res, next) {
    try {
      const { creatorId } = req.params;
      const events = await EventService.getUserEvents(creatorId);
      return res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  async findEvent(req, res, next) {
    try {
      const { searchValue, searchType } = req.body;
      const events = await EventService.findEvent(searchValue, searchType);
      return res.json(events);
    } catch (error) {
      next(error);
    }
  }

  async setAvatar(req, res, next) {
    try {
      const name = req.params.name.substring(1);
      const file = req.file;
      if (file) {
        EventService.setAvatar(file.path, name);
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Set avatar error" });
    }
  }
}

module.exports = new EventController();

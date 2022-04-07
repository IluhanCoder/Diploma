const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  name: { type: String, required: true },
  creatorId: { type: String, required: true },
  creatorName: { type: String, required: true },
  desc: { type: String, required: true },
  genres: { type: [String], required: true },
  date: { type: Date, required: true },
  adress: { type: String, required: true },
  participants: { type: [String], required: false },
  avatar: { type: String, required: false, default: null },
  songs: { type: [String], required: false, default: null },
  isSubmited: { type: Boolean, default: false },
});

module.exports = model("Event", EventSchema);

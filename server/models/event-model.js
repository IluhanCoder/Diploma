const { Schema, model } = require("mongoose");

//EventSchema represents musical event data
const EventSchema = new Schema({
  name: { type: String, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true },
  desc: { type: String, required: true },
  rider: { type: String, required: true },
  genres: { type: [String], required: true },
  date: { type: Date, required: true },
  adress: { type: String, required: true },
  participantsId: {
    type: { id: String, role: String, rights: Number },
    required: false,
  },
  avatar: { type: String, required: false, default: null },
  songs: { type: [Schema.Types.ObjectId], required: false, default: [] },
  musiciansNeeded: { type: [String], required: true, default: [] },
  isSubmited: { type: Boolean, default: false },
});

module.exports = model("Event", EventSchema);

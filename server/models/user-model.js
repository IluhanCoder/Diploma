const { Schema, model, ObjectId } = require("mongoose");
const eventModel = require("./event-model");

const UserSchema = new Schema(
  {
    login: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    birthday: { type: Date, required: true },
    cell: { type: String, required: true },
    //todo: think about city choosing logic
    city: { type: String, required: true },
    //todo: change gender choose logic
    gender: { type: String, required: true },
    avatar: { type: String, required: false },
    isActivated: { type: String, default: true },
    activationLink: { type: String },
    eventInvites: { type: [Object], required: false },
    eventPropositions: { type: [Object], required: false },
  },
  { strict: false }
);

module.exports = model("User", UserSchema);

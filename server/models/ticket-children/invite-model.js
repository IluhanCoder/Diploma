const { Schema, model, Mongoose } = require("mongoose");
const Ticket = require("../ticket-model");

//Invite inherented TicketSchema, the same stuff happening with
//Proposition. I did it since Proposition and Invite doeing different functions,
//so two of them stored in different collections, event when they may have exactly
//same fields and properties

//this InviteSchema contains nothing, but it exists for a possible future features
const InviteSchema = new Schema({});

//so here we have a discrimination of "Ticket" schema
module.exports = Ticket.discriminator("Invite", InviteSchema);

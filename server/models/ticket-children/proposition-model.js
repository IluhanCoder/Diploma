const { Schema, model, Mongoose } = require("mongoose");
const Ticket = require("../ticket-model");

//Proposition inherented TicketSchema, the same stuff happening with
//Invite. I did it since Proposition and Invite doeing different functions,
//so two of them stored in different collections, event when they may have exactly
//same fields and properties

//this PropositionSchema contains nothing, but it exists for a possible future features
const PropositionSchema = new Schema({});

//so here we have a discrimination of "Ticket" schema
module.exports = Ticket.discriminator("Proposition", PropositionSchema);

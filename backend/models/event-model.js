const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  type: String,
  venue: String,
  to: String,
  from: String,
  description: String,
  participantGroupings: [
    String
  ],
  prizes: [
    String
  ],
  structures: [
    {
      name: { type: String },
      points: [String],
    }
  ],
  participants: [{
    type: Schema.Types.ObjectId,
    ref: "user",
    unique:true,
  }],
  detailed_description: String,
  status: { type: String, default: 'active' },
  logo: String,
  image: String,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Event = mongoose.model("event", eventSchema);

module.exports = Event;

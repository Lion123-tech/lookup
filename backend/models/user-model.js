const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { unique: false, type: String },
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true,
  },
  gender:{
    type: String,
    default:""
  },
  about: {
    type: String,
    default:""
  },
  number: {
    type: String,
    default:""
  },
  city: {
    type: String,
    default:""
  },
  pic: {
    type: String,
    default:""
  },
  school: {
    type: String,
    default:""
  },
  education: {
    grade: {
      type: String,
      default:""
    },
    address: {
      type: String,
      default:""
    },
    school: {
      type: String,
      default:""
    },
    from: {
      type: String,
      default:""
    },
    to: {
      type: String,
      default:""
    },
    previouspercentage: {
      type: String,
      default:""
    },
  },
  achievements: [
    {
      title: { type: String },
      description: { type: String },
      type: { type: String },
      location: { type: String },
      image: { type: String }
    }
  ],
  projects: [
    {
      title: { type: String },
      description: { type: String },
      year: { type: String },
    }
  ],
  awards: [
    {
      title: { type: String },
      description: { type: String },
      year: { type: String },
    }
  ],
  scholarships: [
    {
      title: { type: String },
      description: { type: String },
      year: { type: String },
    }
  ],
  others: [
    {
      title: { type: String },
      description: { type: String },
      year: { type: String },
    }
  ],
  internships: [
    {
      title: { type: String },
      description: { type: String },
      year: { type: String },
    }
  ],
  skills: [String],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: "user"

  }],
  connections: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  pendings: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  requestsent: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  followings: [{
    type: Schema.Types.ObjectId,
    ref: "user"
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },

});

const User = mongoose.model("user", userSchema);

module.exports = User;

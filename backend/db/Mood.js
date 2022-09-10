const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let schema = new mongoose.Schema(
  {
    mood: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      max: 100,
      default: 0,
      validate: {
        validator: function (v) {
          return v >= 1.0 && v <= 100.0;
        },
        msg: "Invalid score",
      },
    },
    date_added:{
      type: Date,
      default:new Date(),
    },
    description:{
      type: String
    }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("Mood", schema);

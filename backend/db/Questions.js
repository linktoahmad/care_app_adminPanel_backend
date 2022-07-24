const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
    scores: {
      type: [Number],
      required: true,
    },
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("questions", schema);

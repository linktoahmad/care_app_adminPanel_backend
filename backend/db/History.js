const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    dateOfQuiz: {
      type: Date,
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
    }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("history", schema);

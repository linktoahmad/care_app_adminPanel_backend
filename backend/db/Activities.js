const mongoose = require("mongoose");

let schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image:{
      data:Buffer,
      required:false,
      type:String,
    }
  },
  { collation: { locale: "en" } }
);

module.exports = mongoose.model("activities", schema);

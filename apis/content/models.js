const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title required"],
    },
    content: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);

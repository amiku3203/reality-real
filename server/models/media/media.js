const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    mediaThumbnails: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const mediaModel = mongoose.model("Media", mediaSchema);

module.exports = mediaModel;

const mongoose = require("mongoose");

// Sub-schema for Subcity (locality)
const subcitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subcity name is required."],
    unique: true,
  },
});

// Main City Schema
const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "City name is required."],
      unique: true,
      validate: {
        validator: (v) => /^[A-Z][a-zA-Z\s]*$/.test(v),
        message: "City name must start with a capital letter and contain only letters and spaces.",
      },
    },
    subcities: [subcitySchema],
  },
  { timestamps: true }
);

const City = mongoose.model("City", citySchema);

module.exports = City;

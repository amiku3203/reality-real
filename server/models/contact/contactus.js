const mongoose = require('mongoose');

// Schema for address
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
});

const contactUsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  alternateEmail: String,
  contactNumber: { type: String, required: true },
  alternateContactNumber: String,
  gst: String,
  rera: String,
  addresses: [addressSchema],
});

module.exports = mongoose.model('ContactUs', contactUsSchema);

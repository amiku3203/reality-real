const City = require("../../models/city/city");

// Add a new city
const addCity = async (req, res) => {
  console.log("Adding city")
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "City name is required." });
    }

    // Check if city already exists
    const existingCity = await City.findOne({ name });
    if (existingCity) {
      return res.status(400).json({ message: "City already exists." });
    }

    // Create and save the city
    const city = new City({ name });
    await city.save();

    res.status(201).json({ success: true, message: "City added successfully.", city });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error adding city.",
    });
  }
};

// Add a subcity (locality) to an existing city
const addSubcity = async (req, res) => {
  try {
    const { cityId, name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Subcity name is required." });
    }

    // Find the city by ID
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found." });
    }

    // Check if the subcity already exists
    if (city.subcities.some((subcity) => subcity.name === name)) {
      return res.status(400).json({ message: "Subcity already exists in this city." });
    }

    // Add the subcity and save
    city.subcities.push({ name });
    await city.save();

    res.status(200).json({ success: true, message: "Subcity added successfully.", city });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error adding subcity.",
    });
  }
};

// Get all cities with subcities
const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({ success: true, cities });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error retrieving cities.",
    });
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  try {
    const { cityId } = req.params;

    await City.findByIdAndDelete(cityId);
    res.status(200).json({ success: true, message: "City deleted successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting city.",
    });
  }
};

// Delete a subcity from a city
const deleteSubcity = async (req, res) => {
  try {
    const { cityId, subcityId } = req.params;

    // Find the city
    const city = await City.findById(cityId);
    if (!city) {
      return res.status(404).json({ message: "City not found." });
    }

    // Remove the subcity
    city.subcities = city.subcities.filter((subcity) => subcity._id.toString() !== subcityId);
    await city.save();

    res.status(200).json({ success: true, message: "Subcity deleted successfully.", city });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting subcity.",
    });
  }
};

module.exports = {
  addCity,
  addSubcity,
  getAllCities,
  deleteCity,
  deleteSubcity,
};

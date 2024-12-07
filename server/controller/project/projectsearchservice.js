const mongoose = require("mongoose");
const Project = require("../../models/properties/project"); // Assuming Project model is in models/project.js

// Global search function
async function searchProjects(query) {
  try {
    // Define the fields to search in
    const searchFields = [
        "RERA",
        "ProjectStatus",
        "ProjectNameOnRera",
        "ProjectTypology",
        "price",
        "projectLocation",
        "Possesion",
        "projectDescription",
        "amenities",
        "city",
        "locality",
        "home",
        "ProjectName",
        "PropertyCategory",
        "PropertyType",
        "AboutTheBuilder",
        "AboutTheBuilderDescription",
        
    ];

    console.log("query", query);

    let searchQuery = {};

    // If a city is provided, add it to the search query
    if (query.city) {
      searchQuery.city = { $regex: query.city, $options: "i" };  // Case-insensitive search for city
    }

    // If a keyword is provided, split it and search across multiple fields
    if (query.keyword) {
      // Split keywords by pipe `|` and create individual regex queries
      const keywords = query.keyword.split("|").map(keyword => keyword.trim());
      searchQuery.$or = searchFields.map(field => ({
        [field]: { $in: keywords.map(keyword => ({ $regex: keyword, $options: "i" })) }
      }));
    }

    // Handle PropertySize: ensure it's a valid number if provided
    if (query.PropertySize) {
      const propertySize = parseFloat(query.PropertySize);
      if (!isNaN(propertySize)) {
        searchQuery.PropertySize = propertySize;
      } else {
        console.warn("Invalid PropertySize value:", query.PropertySize);
      }
    }

    // Log the search query for debugging
    console.log("searchQuery", searchQuery);

    // Perform the search in the database
    const results = await Project.find(searchQuery);

    // Log the results to check the output
    console.log("results", results);

    return results;
  } catch (error) {
    console.error("Error during search:", error);
    throw error;
  }
}

module.exports = { searchProjects };

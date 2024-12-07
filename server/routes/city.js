const express = require("express");
const router = express.Router();
const  { addCity,getAllCities,deleteCity,deleteSubcity,addSubcity }=  require("../controller/city/citycontroller");
// Route to add a city
router.post("/add-city", addCity );

// Route to add a subcity to a city
router.post("/add-subcity", addSubcity);

// Route to get all cities with their subcities
router.get("/cities", getAllCities);

// Route to delete a city
router.delete("/delete-city/:cityId", deleteCity);

// Route to delete a subcity from a city
router.delete("/delete-subcity/:cityId/:subcityId", deleteSubcity);

module.exports = router;

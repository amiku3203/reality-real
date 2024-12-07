const express = require("express");
const router = express.Router();
const { createTestimonial, getAllTestimonials } = require("../controller/aboutus/testmo");

// Route to create a testimonial
router.post("/create", createTestimonial);

// Route to get all testimonials
router.get("/all", getAllTestimonials);

module.exports = router;

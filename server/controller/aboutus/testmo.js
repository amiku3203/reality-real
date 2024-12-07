const Testimonial = require("../../models/aboutus/testimonials");

// Create a testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { name, designation, ratings, description } = req.body;
    const newTestimonial = new Testimonial({ name, designation, ratings, description });
    await newTestimonial.save();
    res.status(201).json({ success: true, message: "Testimonial created successfully", data: newTestimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create testimonial", error: error.message });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch testimonials", error: error.message });
  }
};

const Enquiry = require('../../models/enquires/contact');

// Add an enquiry
exports.addEnquiry = async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !mobile || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const newEnquiry = new Enquiry({ name, email, mobile, message });
    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully.',
      data: newEnquiry,
    });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

// Get all enquiries (optional)
exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

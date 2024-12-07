const express = require('express');
const router = express.Router();
 
const contactcontroller= require("../controller/contactus/contactcontroller");
const othercontroller= require("../controller/carrer/otherenq");
// Route to add contact details with image upload
router.post('/add',  contactcontroller.addContactDetails  ); // 'logos' is the field name for image uploads
router.get("/getcontact", contactcontroller.getContactDetails);



router.post('/add-enquiry',  othercontroller.addEnquiry);

// GET route to fetch all enquiries (optional)
router.get('/get-enquiries',  othercontroller.getEnquiries);




module.exports = router;

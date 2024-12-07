const ContactUs= require("../../models/contact/contactus")


const addContactDetails = async (req, res) => {
  try {
    const contactData = req.body;

    const newContact = new ContactUs(contactData);
    await newContact.save();

    res.status(201).json({ message: 'Contact details saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error saving contact details' });
  }
};

const getContactDetails = async (req, res) => {
  try {
    const contactDetails = await ContactUs.find();

    if (!contactDetails) {
      return res.status(404).json({ error: 'No contact details found' });
    }

    res.status(200).json(contactDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching contact details' });
  }
};
module.exports = {
  addContactDetails,
  getContactDetails,
};

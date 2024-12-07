import React, { useEffect, useState } from 'react';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { FaRegAddressCard, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { toast,Toaster } from 'react-hot-toast';

const ContactUs = () => {
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch('https://reality-demo.onrender.com/api/v1/contact/getcontact');
        const data = await response.json();
        console.log("data", data);
        setContactDetails(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact details:', error);
        toast.error('Failed to load contact details');
        setLoading(false);
      }
    };

    fetchContactDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://reality-demo.onrender.com/api/v1/contact/add-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
       
        toast.success('Message sent successfully!');
       
     
    } catch (error) {
      // console.error('Error:', error);
      // toast.error('Something went wrong.');
    }
    // Implement your form submission logic here
    // e.g., call an API to send the form data

    setIsSubmitting(false);
    // toast.success('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      mobile: '',
      message: '',
    });
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="spinner-border text-orange-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const contact = contactDetails[0]; // Assuming you're displaying the first contact detail

  if (!contact) {
    return <p className="text-center py-20">No contact details found.</p>;
  }

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster/>
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-red-600">Contact Us</h2>
        <p className="mt-4 text-lg text-gray-600">
          We’d love to hear from you! Whether you’re curious about products or just need assistance, we’re here to help.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Phone */}
        <div className="bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center items-center text-center">
          <AiOutlinePhone className="text-4xl text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Phone</h3>
          <p className="text-gray-600 mb-4">Call us at any time</p>
          <a href={`tel:${contact.contactNumber}`} className="text-lg text-gray-800 font-semibold">
            {contact.contactNumber}
          </a>
        </div>

        {/* Email */}
        <div className="bg-white p-8 shadow-lg rounded-lg flex flex-col justify-center items-center text-center">
          <FaEnvelope className="text-4xl text-red-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Email</h3>
          <p className="text-gray-600 mb-4">Reach out via email</p>
          <a href={`mailto:${contact.email}`} className="text-lg text-gray-800 font-semibold">
            {contact.email}
          </a>
        </div>

        {/* Addresses */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Addresses</h3>
          {contact.addresses && contact.addresses.length > 0 ? (
            contact.addresses.map((address, index) => (
              <div key={index} className="mb-4 text-center">
                <FaMapMarkerAlt className="text-4xl text-red-600 mb-2" />
                <p className="text-lg font-semibold text-gray-800">
                  {address.street}, {address.city}, {address.state} - {address.zipCode}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No addresses available.</p>
          )}
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Send Us a Message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-red-600"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Mobile</label>
              <input
                type="text"
                name="mobile"
                className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Your mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                rows="4"
                name="message"
                className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

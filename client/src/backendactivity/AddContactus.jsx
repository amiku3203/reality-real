import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineMail, AiOutlinePhone, AiOutlineFileAdd } from 'react-icons/ai';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdDeleteOutline } from "react-icons/md";

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [alternateContactNumber, setAlternateContactNumber] = useState('');
  const [gst, setGst] = useState('');
  const [rera, setRera] = useState('');
  const [addresses, setAddresses] = useState([{ street: '', city: '', state: '', zipCode: '' }]);

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { street: '', city: '', state: '', zipCode: '' }]);
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      alternateEmail,
      contactNumber,
      alternateContactNumber,
      gst,
      rera,
      addresses,
    };

    try {
      const response = await fetch('https://reality-demo.onrender.com/api/v1/contact/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
//  console.log("jkshgjk",await response.json())
      if (!response.ok) {
        throw new Error('Error saving contact details');
      }

      toast.success('Contact details saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error saving contact details');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Contact Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Fields */}
        <div className="space-y-2">
          <label className="block text-gray-700 flex items-center">
            <AiOutlineMail className="mr-2 text-orange-500" />
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 flex items-center">
            <AiOutlineMail className="mr-2 text-orange-500" />
            Alternate Email:
          </label>
          <input
            type="email"
            value={alternateEmail}
            onChange={(e) => setAlternateEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Contact Numbers */}
        <div className="space-y-2">
          <label className="block text-gray-700 flex items-center">
            <AiOutlinePhone className="mr-2 text-orange-500" />
            Contact Number:
          </label>
          <input
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 flex items-center">
            <AiOutlinePhone className="mr-2 text-orange-500" />
            Alternate Contact Number:
          </label>
          <input
            type="text"
            value={alternateContactNumber}
            onChange={(e) => setAlternateContactNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* GST and RERA */}
        <div className="space-y-2">
          <label className="block text-gray-700 flex items-center">
            <FaRegAddressCard className="mr-2 text-orange-500" />
            GST:
          </label>
          <input
            type="text"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 flex items-center">
            <FaRegAddressCard className="mr-2 text-orange-500" />
            RERA:
          </label>
          <input
            type="text"
            value={rera}
            onChange={(e) => setRera(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Address Section */}
      <div>
        <label className="block text-gray-700 flex items-center">
          <AiOutlineFileAdd className="mr-2 text-orange-500" />
          Addresses:
        </label>
        {addresses.map((address, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Street"
              value={address.street}
              onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="State"
              value={address.state}
              onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={address.zipCode}
              onChange={(e) => handleAddressChange(index, 'zipCode', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {addresses.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveAddress(index)}
                className="text-red-600 mt-4 text-sm"
              >
                <MdDeleteOutline size={24} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddAddress}
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center"
        >
          <AiOutlineFileAdd className="mr-2" />
          Add Address
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;

import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegAddressCard, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const [cities, setCities] = useState([]);
  const [contactDetails, setContactDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://reality-demo.onrender.com/api/v1/city/cities");
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.cities.slice(0, 5)); // Get top 5 cities
      } catch (error) {
        console.error("Error fetching cities:", error.message);
        toast.error("Failed to load cities");
      }
    };

    const fetchContactDetails = async () => {
      try {
        const response = await fetch("https://reality-demo.onrender.com/api/v1/contact/getcontact");
        const data = await response.json();
        setContactDetails(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact details:", error.message);
        toast.error("Failed to load contact details");
        setLoading(false);
      }
    };

    fetchCities();
    fetchContactDetails();
  }, []);

  const contact = contactDetails[0]; // Get first contact detail

  return (
    <footer className="bg-gradient-to-r from-orange-600 to-blue-600 text-white py-8 px-6 sm:px-12">
      <div className="container mx-auto text-center sm:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="space-y-4">
  <h4 className="text-xl font-semibold text-orange-500 mb-4">Address</h4>
  {contact?.addresses && contact?.addresses?.length > 0 ? (
    <ul className="space-y-4">
      {contact?.addresses?.map((address, index) => (
        <li key={index} className="text-center">
          <div className="flex items-center justify-center space-x-2">
            {/* <FaMapMarkerAlt className="text-4xl text-red-600" /> */}
            <p className="text-lg   text-gray-300">
              {address.street}, {address.city}, {address.state} - {address.zipCode}
            </p>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-center text-gray-600">No addresses available.</p>
  )}
</div>


          {/* Section 1: Logo and Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-orange-500 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-orange-500">Home</a></li>
              <li><a href="/property" className="text-gray-300 hover:text-orange-500">Property</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-orange-500">Contact</a></li>
            </ul>
          </div>

          {/* Section 2: Navigation Links */}
         

          {/* Section 3: Social Media */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-orange-500 mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaFacebookF size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-orange-500"><FaLinkedinIn size={24} /></a>
            </div>
          </div>

          {/* Section 4: Top Cities */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-orange-500 mb-4">Top Cities</h4>
            <ul className="list-disc list-inside space-y-2 text-center sm:text-left">
              {cities.map((city, index) => (
                <Link to="/property" key={index}>
                  <li className="text-gray-300 hover:text-orange-500">{city.name}</li>
                </Link>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-gray-300 text-sm">
          <p>&copy; 2024 Company Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

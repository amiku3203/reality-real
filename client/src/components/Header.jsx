import React, { useEffect, useState } from 'react';
import { FaPhone, FaHandsHelping, FaClipboardList } from 'react-icons/fa'; // Added new icons
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactDetails, setContactDetails] = useState([]);
  // Navigation data

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch('https://reality-demo.onrender.com/api/v1/contact/getcontact');
        const data = await response.json();
        console.log("data", data);
        setContactDetails(data);
       
      } catch (error) {
         
       
      }
    };

    fetchContactDetails();
  }, []);
  const contact = contactDetails[0]; 
  const navLinks = [
    { label: 'Home', to: '/' },
    {
      label: 'About',
      subLinks: [
        { label: 'What We Do', to: '/what-we-do', icon: <FaClipboardList /> },
        { label: 'Testimonials', to: '/testimonials', icon: <FaHandsHelping /> },
      ],
    },
    {
      label: 'Media',
      subLinks: [
        { label: 'Awards and Recognition', to: '/awards' },
      ],
    },
    { label: 'Properties', to: '/property' },
    { label: 'Blog', to: '/blogs' },
    { label: 'Career', to: '/career' },
    { label: 'Contact Us', to: '/contact' },
    
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky font-serif top-0 z-50 bg-gradient-to-r from-orange-600 to-blue-600 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="h-8 md:h-10"
            src="https://realtyassistant.in/assets/img/ra-logo.png" // Adjust to your logo's path
            alt="Realty Assistant"
            title="Realty Assistant"
          />
        </Link>

        {/* Navigation Links for Large Devices */}
        <nav className="hidden md:flex space-x-6 text-white font-medium">
          {navLinks.map((link, index) =>
            link.subLinks ? (
              <div key={index} className="relative group">
                <button className="hover:text-gray-300 flex items-center gap-2">
                  {link.label}
                </button>
                <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-md">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      to={subLink.to}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
                    >
                      {subLink.icon} {subLink.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={index} to={link.to} className="hover:text-gray-300">
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Contact Info */}
        <div className="text-white flex items-center space-x-2">
          <FaPhone />
          <a  href={`tel:${contact?.contactNumber}`} className="hover:text-gray-300">
          {contact?.contactNumber}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <AiOutlineClose className="h-6 w-6" />
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <nav className="container mx-auto px-4 space-y-2">
            {navLinks.map((link, index) =>
              link.subLinks ? (
                <div key={index}>
                  <p className="block py-2 text-gray-800 font-semibold">
                    {link.label}
                  </p>
                  <div className="ml-4 space-y-1">
                    {link.subLinks.map((subLink, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subLink.to}
                        className="block text-gray-800 hover:text-blue-600"
                      >
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.to}
                  className="block py-2 text-gray-800"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

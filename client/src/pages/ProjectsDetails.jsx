import React, { useEffect, useRef, useState } from 'react';
import { FaRuler, FaMapMarkerAlt, FaBuilding, FaMoneyBillAlt, FaHome, FaRegCalendarAlt, FaPhone } from 'react-icons/fa';
import { MdQrCode2 } from 'react-icons/md';
import { FaSearch, FaCity } from 'react-icons/fa';
 
import {  FaChevronDown,FaChevronUp} from "react-icons/fa";
import {Link, useParams} from "react-router-dom"
 
import TrendingProjects from '../components/TrendingProjects';

const ProjectsDetails = () => {
  const summaryRef = useRef(null);
  const descriptionRef = useRef(null);
  const amenitiesRef = useRef(null);
  const floorPlanRef = useRef(null);
  const galleryRef = useRef(null);
  const mapRef = useRef(null);
  const downloadRef = useRef(null);
  const [city, setCity] = useState('');
  const [keyword, setKeyword] = useState('');
  const [open, setOpen] = useState(null);
  const {slug} = useParams();
  const [projects1, setProjects] = useState('');
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const fetchProjectBySlug = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/project/${slug}`);
        const data = await response.json();
        console.log("PROJECT_DETAILS",data);
        setProjects(data); // Adjust based on the API response structure
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjectBySlug();
  }, []);



  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index); // Toggle the FAQ answer visibility
  };

   

   
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProjects = 4;

  const handlePrev = () => {
      setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? projects.length - visibleProjects : prevIndex - 1
      );
  };

  const handleNext = () => {
      setCurrentIndex((prevIndex) =>
          prevIndex === projects.length - visibleProjects ? 0 : prevIndex + 1
      );
  };
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  return (
    <>
    <div className="max-w-screen-xl mx-auto p-6">

      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-6xl mx-auto mt-8 font-sans max-h-2xl transition-all duration-500">
        {/* Title Section */}
        <div className="bg-orange-600 text-white py-4 px-6 rounded-t-2xl text-center shadow-md mb-6">
          <h1 className="text-3xl font-semibold tracking-tight uppercase"> {projects1.ProjectName}</h1>
        </div>
        
        {/* Details Table */}
        <div className="bg-gray-50 p-6 rounded-b-2xl shadow-inner grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-gray-200">
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaRegCalendarAlt className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">RERA</span>
            <p className="text-gray-700">{projects1.RERA}</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaBuilding className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">{projects1.ProjectNameOnRera}</span>
            <p className="text-gray-700"> {projects1.ProjectName}</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <MdQrCode2 className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">View QR Code</span>
            <p className="text-blue-600 underline cursor-pointer">QR Code Available</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaRuler className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">Property Size</span>
            <p className="text-gray-700">{projects1.PropertySize} sq. mt.</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaHome className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">Typology</span>
            <p className="text-gray-700">{projects1?.ProjectTypology}</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaMapMarkerAlt className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">Location</span>
            <p className="text-gray-700"> {projects1.city} , {projects1.locality}</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaRegCalendarAlt className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">Project Status</span>
            <p className="text-gray-700"> {projects1.ProjectStatus}</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
          <div className="p-4 space-y-3 hover:bg-gray-100 transition-all duration-300">
            <FaMoneyBillAlt className="text-orange-600 mb-2 text-2xl mx-auto" />
            <span className="font-semibold text-black">Price</span>
            <p className="text-gray-700">{projects1?.price?.totalPrice} Cr.* Onwards</p>
            <div className="border-t border-gray-200 mt-3"></div>
          </div>
        </div>

        {/* Button Section */}
        <div className="text-center mt-8">
  <a href={`tel:+91${projects1.ContactNumber}`}>
    <button className="bg-orange-600 text-white px-10 py-4 rounded-full shadow-lg hover:bg-orange-700 transform transition-all duration-300 flex items-center justify-center mx-auto">
      <FaPhone className="mr-3 text-lg" /> Instant Call Back
    </button>
  </a>
</div>


        {/* Footer Text */}
        <div className="bg-black text-white py-3 px-6 mt-6 rounded-full text-center shadow-md">
          <h2 className="font-medium text-lg">by {projects1.ProjectName}</h2>
        </div>
      </div>

      {/* Search Section */}
       

      {/* Property Details and Contact Form Section */}
      <div className="flex flex-wrap justify-evenly mt-12">
        {/* Left Div (Property Details) */}
        <div className="w-full md:w-1/2 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
  <h2 className="text-3xl font-semibold text-gray-800 mb-6">Property Details</h2>
  
  {/* Property Image */}
  <div className="relative mb-6">
    <img 
       src={`http://localhost:8000/${projects1.thumbnail}`} // Replace with actual image source
      alt="Property Image"
      className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105 duration-500"
    />
    <div className="absolute bottom-4 left-4 text-white bg-gray-800 px-4 py-2 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300">
      <span className="font-bold">  {projects1.ProjectName}</span>
    </div>
  </div>

  {/* Navigation Buttons */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
  <button
          onClick={() => scrollToSection(summaryRef)}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 h-12 w-full"
        >
          Summary
        </button>
        <button
          onClick={() => scrollToSection(descriptionRef)}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 h-12 w-full"
        >
          Description
        </button>
        <button
          onClick={() => scrollToSection(amenitiesRef)}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 h-12 w-full"
        >
          Amenities
        </button>
        <button
          onClick={() => scrollToSection(floorPlanRef)}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 h-12 w-full"
        >
          Floor Plan
        </button>
        <button
          onClick={() => scrollToSection(galleryRef)}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 h-12 w-full"
        >
          Gallery
        </button>
        <button
          onClick={() => scrollToSection(mapRef)}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 h-12 w-full"
        >
          Map
        </button>
        <button
          onClick={() => scrollToSection(downloadRef)}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 h-12 w-full text-ellipsis whitespace-nowrap"
        >
          Download
        </button>

 


</div>
<div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner" ref={summaryRef}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Summary</h3>
            <table className="w-full text-left text-gray-700">
              <tbody>
                <tr className="border-b">
                  <th className="py-2 font-semibold">Property Category:</th>
                  <td className="py-2"> {projects1.PropertyCategory}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 font-semibold">Builder Name:</th>
                  <td className="py-2">Godrej Properties</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 font-semibold">Typology:</th>
                  <td className="py-2">{projects1?.ProjectTypology}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 font-semibold">Property Status:</th>
                  <td className="py-2">{projects1.ProjectStatus}</td>
                </tr>
                <tr className="border-b">
                  <th className="py-2 font-semibold">Property Type:</th>
                  <td className="py-2"> {projects1.PropertyType
                  }</td>
                </tr>
                <tr>
                  <th className="py-2 font-semibold">Possession:</th>
                  <td className="py-2"> {projects1.Possesion}</td>
                </tr>
              </tbody>
            </table>
          </div>
{/* Quick Summary Section */}
 

{/* Detailed Property Description */}
<div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner flex flex-col items-center" ref={descriptionRef}>
  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Property Description</h3>
  <div
    className="text-gray-700 text-center w-full max-w-3xl"
    dangerouslySetInnerHTML={{ __html: projects1.projectDescription }}
  ></div>
  <p className="text-gray-500 text-xs mt-4 text-center">*T&C Apply.</p>
</div>

{/* <div className="mt-6 bg-gray-50 p-8 rounded-lg shadow-lg" ref={amenitiesRef}>
  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Amenities</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {projects1?.amenities[0]?.split(',').map((amenity, index) => (
      <label
        key={index}
        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 text-gray-700 cursor-pointer hover:bg-orange-100"
      >
        <input
          type="radio"
          name="amenities"
          value={amenity.trim()}
          className="form-radio text-orange-500 hidden h-5 w-5 focus:ring-orange-500 cursor-pointer"
        />
        <span className="text-lg font-semibold text-gray-800 ml-3">{amenity.trim()}</span>
      </label>
    ))}
  </div>
</div> */}


 




<div className="bg-gray-50 p-6 rounded-lg shadow-inner" ref={floorPlanRef}>
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Floor Plan</h3>

    {/* Floor Plan Image */}
    <div className="relative mb-6">
      <img 
         src={`http://localhost:8000/${projects1?.floorPlan?.thumbnail}`} // Replace with actual floor plan image
        alt="Floor Plan"
        className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 right-4 bg-orange-600 text-white py-2 px-4 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300">
        <span className="font-bold">{projects1?.floorPlan?.floorPlan}</span>
      </div>
    
    </div>

    {/* Description */}
    <p className="text-gray-700 mb-4">
      Explore the well-designed floor plan for this property, offering spacious rooms and modern amenities, ensuring maximum comfort and convenience.
    </p>

    {/* Floor Plan Features */}
    <ul className="list-disc list-inside text-gray-700 mb-4">
      <li>2 BHK and 3 BHK configurations</li>
      <li>Modern kitchen and living areas</li>
      <li>Generous balcony space with scenic views</li>
      <li>Optimized layout for easy flow of natural light</li>
    </ul>

    {/* Interactive Button */}
    <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 w-full">
      View Full Floor Plan
    </button>
  </div>
 




  <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Pricing Information</h3>

    {/* Pricing Details */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-gray-600 text-lg">Starting from:</p>
        <h4 className="text-3xl font-bold text-orange-600">  </h4>
      </div>

      {/* Discount Badge */}
      <div className="bg-green-600 text-white py-1 px-3 rounded-full text-sm font-semibold">
      {projects1?.price?.discount}% Off
      </div>
    </div>

    {/* Price Breakdown */}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Base Price:</span>
        <span className="font-semibold text-gray-800">${projects1?.price?.basePrice}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Location Premium:</span>
        <span className="font-semibold text-gray-800">${projects1?.price?.locationPremium}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Amenities Charge:</span>
        <span className="font-semibold text-gray-800">${projects1?.price?.amenitiesCharge}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-700">Tax:</span>
        <span className="font-semibold text-gray-800"> ${projects1?.price?.totalPrice}</span>
      </div>
    </div>

    {/* Total Price */}
    <div className="mt-6 flex items-center justify-between">
      <span className="text-gray-700 text-lg font-semibold">Total Price:</span>
      <span className="text-3xl font-bold text-orange-600">${projects1?.price?.totalPrice}</span>
    </div>

    {/* Payment Plan Button */}
    <div className="mt-6">
      <button className="w-full py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300">
        View Payment Plans
      </button>
    </div>
  </div>





  <div className="mb-6" ref={galleryRef}>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Property Gallery</h3>

     <div className="mt-6 bg-gray-50 p-8 rounded-lg shadow-lg">
  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Gallery</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {projects1?.Gallery?.map((image, index) => (
      <div key={index} className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <img
          src={`http://localhost:8000/${image?.path}`} // Replace with actual image path
          alt={`Property Image ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="font-semibold text-lg">Image {index + 1}</p>
        </div>
      </div>
    ))}
  </div>
</div>

  </div>

  <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">Location Map</h3>

  {/* Google Map */}
  <div className="relative mb-6" ref={mapRef}>
    <iframe
      src={`https://www.google.com/maps/embed?pb=${projects1?.projectLocation?.embedCode}`} // Replace with actual Google Maps embed URL
      className="w-full h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
      allowFullScreen
      loading="lazy"
    ></iframe>
    <div className="absolute top-4 right-4 bg-orange-600 text-white py-2 px-4 rounded-lg opacity-80 hover:opacity-100 transition-all duration-300">
      <span className="font-bold">{projects1?.projectLocation?.name}</span>
    </div>
  </div>

  {/* Description */}
  <p className="text-gray-700 mb-4">
    View the exact location of this property on the map for better understanding of its surroundings, accessibility, and nearby amenities.
  </p>

  {/* Interactive Button */}
  <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 w-full mb-6">
    View on Google Maps
  </button>

  {/* Nearby Locations */}
  {/* <h4 className="text-lg font-semibold text-gray-800 mb-3">Nearby Locations</h4>
   */}
  {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src="https://images.pexels.com/photos/17020237/pexels-photo-17020237/free-photo-of-train.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Shopping Mall" className="w-full h-32 object-cover rounded-lg mb-4"/>
      <h5 className="text-gray-800 font-semibold">Seasons Mall</h5>
      <p className="text-gray-500">1.5 km</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src="https://images.pexels.com/photos/17020237/pexels-photo-17020237/free-photo-of-train.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hospital" className="w-full h-32 object-cover rounded-lg mb-4"/>
      <h5 className="text-gray-800 font-semibold">Sanjivani Hospital</h5>
      <p className="text-gray-500">2.2 km</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src="https://images.pexels.com/photos/17020237/pexels-photo-17020237/free-photo-of-train.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Park" className="w-full h-32 object-cover rounded-lg mb-4"/>
      <h5 className="text-gray-800 font-semibold">Mahalunge Park</h5>
      <p className="text-gray-500">3.0 km</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src="https://images.pexels.com/photos/17020237/pexels-photo-17020237/free-photo-of-train.jpeg?auto=compress&cs=tinysrgb&w=600" alt="School" className="w-full h-32 object-cover rounded-lg mb-4"/>
      <h5 className="text-gray-800 font-semibold">VIBGYOR High School</h5>
      <p className="text-gray-500">1.0 km</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src="https://images.pexels.com/photos/17020237/pexels-photo-17020237/free-photo-of-train.jpeg?auto=compress&cs=tinysrgb&w=600" alt="IT Park" className="w-full h-32 object-cover rounded-lg mb-4"/>
      <h5 className="text-gray-800 font-semibold">EON IT Park</h5>
      <p className="text-gray-500">4.5 km</p>
    </div>

    <div className="bg-white shadow-lg rounded-lg p-4">
      <img src="https://images.pexels.com/photos/17020237/pexels-photo-17020237/free-photo-of-train.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Airport" className="w-full h-32 object-cover rounded-lg mb-4"/>
      <h5 className="text-gray-800 font-semibold">Pune International Airport</h5>
      <p className="text-gray-500">8.0 km</p>
    </div>
  </div> */}
</div>

<div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h3>
      
      {projects1?.faqs?.map((faq, index) => (
        <div key={index} className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow"
            onClick={() => toggleFAQ(index)}
          >
            <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
            {open === index ? (
              <FaChevronUp className="text-purple-600" />
            ) : (
              <FaChevronDown className="text-purple-600" />
            )}
          </div>
          
          {open === index && (
            <p className="text-gray-700 mt-2 p-4 bg-gray-100 rounded-lg">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>

  {/* Call Back Request Button (Uncomment if needed) */}
  {/* <div className="text-center">
    <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-all duration-300">
      <FaPhone className="mr-2" /> Call Back Request
    </button>
  </div> */}

  
</div>


        {/* Right Div (Contact Form) */}
        <div className="w-full md:w-1/3 p-6">      
  <form action="#" method="POST" className="space-y-6 bg-white p-10 rounded-xl shadow-xl border border-gray-200 max-w-lg mx-auto transition-all duration-500 transform hover:scale-105">
    {/* Title */}
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-6 tracking-wide">
      Interested to Buy Property
    </h2>

    {/* Name Field */}
    <div className="relative">
      <input 
        type="text" 
        name="name" 
        placeholder="Enter Your Name" 
        required 
        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 placeholder-gray-500 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl"
      />
    </div>

    {/* Email Field */}
    <div className="relative">
      <input 
        type="email" 
        name="email" 
        placeholder="Enter Your Email" 
        required 
        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 placeholder-gray-500 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl"
      />
    </div>

    {/* Phone Number with Country Code */}
    <div className="relative">
      <div className="flex space-x-2">
        <input 
          type="text" 
          name="country_code" 
          placeholder="+1" 
          required 
          className="w-1/4 px-5 py-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 placeholder-gray-500 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl"
        />
        <input 
          type="tel" 
          name="phone_number" 
          placeholder="Enter Your Mobile Number" 
          required 
          className="w-3/4 px-5 py-4 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 placeholder-gray-500 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl"
        />
      </div>
    </div>

    {/* City Dropdown */}
    <div className="relative">
      <select 
        name="city" 
        required 
        className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 text-gray-800 bg-gray-50 shadow-sm transition-all duration-300 hover:shadow-lg focus:shadow-xl"
      >
        <option value="" disabled>Select City</option>
        <option value="New York">New York</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        <option value="Houston">Houston</option>
        <option value="Phoenix">Phoenix</option>
      </select>
    </div>

    {/* Submit Button */}
    <div className="flex justify-center">
      <button 
        type="submit"
        className="w-full bg-orange-600 text-white py-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-lg transform active:scale-95 hover:shadow-xl"
      >
        Submit Now
      </button>
    </div>
  </form>

  {/* Related Projects Section */}
  <div className="mt-12">
    <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Related Projects</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
      {/* Project 1 */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img src= "https://images.pexels.com/photos/8143671/pexels-photo-8143671.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Project 1" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800"> Books by amit shop </h4>
          <p className="text-sm text-gray-500">Published on: 01/01/2024</p>
        </div>
      </div>

      {/* Project 2 */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img src="https://images.pexels.com/photos/8134850/pexels-photo-8134850.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Project 2" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800"> Beer by amit shop</h4>
          <p className="text-sm text-gray-500">Published on: 02/01/2024</p>
        </div>
      </div>

      {/* Project 3 */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img src="https://images.pexels.com/photos/7031595/pexels-photo-7031595.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Project 3" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800"> Wine By Amit Shop </h4>
          <p className="text-sm text-gray-500">Published on: 03/01/2024</p>
        </div>
      </div>

      {/* Project 4 */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <img src="https://images.pexels.com/photos/7031594/pexels-photo-7031594.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Project 4" className="w-full h-48 object-cover" />
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-800">lux cozy by amit shop</h4>
          <p className="text-sm text-gray-500">Published on: 04/01/2024</p>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>

      <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
  <h3 className="text-xl font-semibold text-gray-800 mb-4">About the Builder</h3>

  {/* Builder Image */}
  <div className="relative mb-6">
    <img 
       src={`http://localhost:8000/${projects1?.AboutTheBuilder?.thumbnail}`} // Replace with builder's image
      alt="Builder"
      className="w-full h-64 object-cover rounded-lg shadow-lg"
    />
  </div>

  {/* Builder Description */}
  <p className="text-gray-700 mb-4">
    {projects1?.AboutTheBuilder?.description}
  </p>

  {/* Builder Features */}
  

  {/* Interactive Button */}
  <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300 w-full">
    Learn More About the Builder
  </button>
</div>

    </div>
     <div className="max-w-7xl mx-auto px-4 py-8">
     
     <div className="relative flex items-center">
         {/* Previous Button */}
        
<TrendingProjects/>
     </div>
     
 </div>
 <div className="bg-gray-50 p-6 flex justify-center text-center flex-col items-center rounded-lg shadow-inner sm:p-8 md:p-10 lg:p-12">
      <Link to={"/disclaimer"}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center sm:text-left">
          Disclaimer
        </h3>
      </Link>
      <p className="text-gray-600 text-sm text-center sm:text-left">
        Please click to read our disclaimer for important information.
      </p>
    </div>
 </>
  );
};

export default ProjectsDetails;

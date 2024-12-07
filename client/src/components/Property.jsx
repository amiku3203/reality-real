import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";
import { FaCity, FaHome, FaBuilding, FaListUl, FaCheckCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Property = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedMainType, setSelectedMainType] = useState(""); // Residential or Commercial
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypology, setSelectedTypology] = useState("");
  const [selectedPossession, setSelectedPossession] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const propertyTypes = {
    Residential: [
      { value: "Apartment", label: "Apartments" },
      { value: "Villas", label: "Villas" },
      { value: "Residential-Plots", label: "Residential Plots" },
      { value: "Independnt-Floor", label: "Independent Floor" },
      { value: "Residential-Studio", label: "Residential Studio" },
      { value: "Residential-Prereleased", label: "Residential Prereleased" },
      { value: "Other Residential", label: "Other Residential" },
    ],
    Commercial: [
      { value: "Commercial-Plots", label: "Commercial Plots" },
      { value: "Commercial-Studio", label: "Commercial Studio" },
      { value: "Office-Space", label: "Office Space" },
      { value: "Food-Court", label: "Food Court" },
      { value: "High-Street-Retails", label: "High Street Retails" },
      { value: "Shops", label: "Shops" },
      { value: "Shops-Showrooms", label: "Shops Showrooms" },
      { value: "Commercial-Prerelease", label: "Commercial Prereleased" },
      { value: "Other", label: "Other" },
    ],
  };

  const possessionOptions = [
    "3 Months",
    "6 Months",
    "1 Year",
    "2 Years +",
    "Ready To Move",
  ];
  

  // Fetch all projects
  useEffect(() => { 
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          "https://reality-demo.onrender.com/api/v1/project/getAllProjects"
        );
        const data = await response.json();
        setProjects(data || []);
        setFilteredProjects(data || []); // Initialize filteredProjects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Fetch all cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://reality-demo.onrender.com/api/v1/city/cities");
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error.message);
      }
    };

    fetchCities();
  }, []);

  // Handle filter changes
  useEffect(() => {
    const applyFilters = () => {
      if (!Array.isArray(projects)) {
        console.error("Projects is not iterable. Ensure it's an array.");
        setFilteredProjects([]);
        return;
      }
  
      let filtered = [...projects];
  
      if (selectedCity) {
        filtered = filtered.filter(
          (project) => project.projectLocation?.name === selectedCity
        );
      }
  
      if (selectedType) {
        filtered = filtered.filter((project) =>
          project.PropertyType === selectedType
        );
      }
  
      if (selectedTypology) {
        filtered = filtered.filter((project) =>
          project.ProjectTypology?.includes(selectedTypology)
        );
      }
  
      if (selectedPossession) {
        filtered = filtered.filter(
          (project) => project.possession === selectedPossession
        );
      }
  
      if (selectedStatus) {
        filtered = filtered.filter(
          (project) => project.ProjectStatus === selectedStatus
        );
      }
  
      setFilteredProjects(filtered);
    };
  
    applyFilters();
  }, [
    selectedCity,
    selectedType,
    selectedTypology,
    selectedPossession,
    selectedStatus,
    projects,
  ]);
  
  return (
    <div className="p-6">
      <div className="bg-cover bg-center p-8" style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}>
        <div className="bg-white/90 p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            THE BEST WAY TO FIND YOUR HOME
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
            {/* City Filter */}
            <div className="relative group">
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none pl-10"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <FaCity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Main Type Filter */}
            <div className="relative group">
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none pl-10"
                value={selectedMainType}
                onChange={(e) => {
                  setSelectedMainType(e.target.value);
                  setSelectedType("");
                }}
              >
                <option value=""> Property Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
              <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* Property Type */}
            { (
              <div className="relative group">
                <select
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none pl-10"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Proopety Cateogory</option>
                  {propertyTypes[selectedMainType]?.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            )}

            {/* Typology (Text Input) */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter Typology (e.g., 2BHK)"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={selectedTypology}
                onChange={(e) => setSelectedTypology(e.target.value)}
              />
              {/* <FaListUl className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
            </div>

            {/* Status (Text Input) */}
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter Status (e.g., Ongoing)"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              />
              {/* <FaCheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> */}
            </div>

            {/* Possession Filter */}
            <div className="relative group">
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-orange-400 focus:outline-none pl-10"
                value={selectedPossession}
                onChange={(e) => setSelectedPossession(e.target.value)}
              >
                <option value="">All Possession</option>
                {possessionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FaCheckCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
    

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link
            to={`/properties/${project.slug}`} // Ensure your details page handles project IDs
            key={project.id}
            
          >
            <div
              key={project.id}
              className="bg-white rounded-lg shadow overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={`https://reality-demo.onrender.com/${project.thumbnail}`}
                  alt={project.name}
                  className="h-48 w-full object-cover"
                />
                <button className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
                  Get Callback
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {project.ProjectName}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{project.projectLocation?.name}</span>
                  </div>
                  <div>
                    <span>{project.ProjectTypology?.join(", ")}</span>
                  </div>
                </div>
                <div className="text-right text-purple-700 font-semibold">
                  {project.price ? (
                    <span>
                      <FaRupeeSign className="inline" /> {project.price.totalPrice}
                    </span>
                  ) : (
                    <span className="text-red-500">On Request</span>
                  )}
                </div>
                <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg shadow-md hover:bg-purple-800 transition-colors">
                  View Details
                </button>
              </div>
            </div>
            </Link>
          ))
        ) : (
          <div>No projects found matching your filters.</div>
        )}
      </div>



        
      </div>
      
    </div>
  );
};

export default Property;

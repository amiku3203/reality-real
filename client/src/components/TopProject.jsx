import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const  TopProjects = () => {
  const [projects, setProjects] = useState([]); // Store projects from API
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProjects = 4;

  // Fetch data from API using fetch
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/project/getAllProjects");
        const data = await response.json();
        const filteredProjects = data.filter(project => project.WhereToShow === "Top-Project");
        setProjects(filteredProjects); // Adjust based on the API response structure
      } catch (error) {
        // console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Handlers for navigation
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-6 text-purple-600">
       Top Projects
      </h2>
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects available</p>
      ) : (
        <div className="relative flex items-center">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="absolute left-0 transform -translate-x-full bg-white rounded-full shadow-md p-2 hover:bg-purple-600 transition-colors"
          >
            <FaChevronLeft className="text-gray-500 hover:text-white" />
          </button>

          {/* Carousel Content */}
          <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 w-full">
            {projects
              .slice(currentIndex, currentIndex + visibleProjects)
              .map((project) => (
                <Link
                  to={`/properties/${project.slug}`} // Ensure your details page handles project IDs
                  key={project.id}
                  className="flex-shrink-0 w-full lg:w-auto"
                >
                  <div className="min-w-full lg:min-w-0 bg-white shadow-lg rounded-md overflow-hidden hover:shadow-2xl transition-shadow h-full">
                   
                    <img
                      src={`http://localhost:8000/${project.thumbnail}`} // Ensure API provides image URLs
                      alt={project.name}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-center">{project.ProjectName}</h3>
                      <div className="border-t border-gray-200 my-3"></div>
                      <p className="text-gray-500 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-purple-600 mr-1" /> {project.city} , {project.locality}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 transform translate-x-full bg-white rounded-full shadow-md p-2 hover:bg-purple-600 transition-colors"
          >
            <FaChevronRight className="text-gray-500 hover:text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TopProjects;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchContent = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProjects = 8; // Number of projects to display at a time

  return (
    <div className="flex flex-col items-center">
         <h2 className="text-2xl font-bold text-white mb-4">
  {projects?.length > 1 
    ? `Search Results: ${projects.length}` 
    : ""}
</h2>

      <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 w-full">
        {projects.map((project) => (
            <Link
              to={`/properties/${project.slug}`}
              key={project.id}
              className="flex-shrink-0 w-full lg:w-auto"
            >
              <div className="min-w-full lg:min-w-0 bg-white shadow-lg rounded-md overflow-hidden hover:shadow-2xl transition-shadow h-full">
                <img
                  src={`http://localhost:8000/${project.thumbnail}`}
                  alt={project.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-center">
                    {project.ProjectName}
                  </h3>
                  <div className="border-t border-gray-200 my-3"></div>
                  <p className="text-gray-500 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-purple-600 mr-1" /> {project.city}, {project.locality}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Pagination Buttons */}
      
      
    </div>
  );
};

export default SearchContent;

import React, { useEffect, useState } from "react";
import { FaTrophy, FaStar, FaArrowRight } from "react-icons/fa"; // React Icons for trophies, stars, and arrow
import { motion } from "framer-motion"; // For animations
import Modal from "react-modal"; // For the modal functionality

// Modal styling (for basic modal)
Modal.setAppElement('#root'); 

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAward, setSelectedAward] = useState(null); // To track the selected award for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // To control modal visibility

  // Fetch all awards data from the API
  useEffect(() => {
    fetch("https://reality-demo.onrender.com/api/v1/media/allmedia")
      .then((response) => response.json())
      .then((data) => {
        setAwards(data.media); // Assuming response has 'media' array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Open the modal with the selected award's details
  const openModal = (award) => {
    setSelectedAward(award);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAward(null);
  };

  // Truncate description for initial display
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-center text-4xl font-bold text-orange-600 mb-12">Best Awards & Recognition</h2>
      
      {/* Awards Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {awards?.map((award) => (
          <motion.div
            key={award._id}
            className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }} // Hover animation
          >
            <div className="mb-4">
              {/* Displaying the image if it exists */}
              {award.mediaThumbnails && (
                <img
                  src={`https://reality-demo.onrender.com${award.mediaThumbnails}`}
                  alt={award.title}
                  className="w-full h-64 object-contain rounded-lg mb-4 border border-gray-300"
                />
              )}
            </div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{award.title}</h3>
              <p className="text-gray-600">{truncateText(award.description, 100)}</p>
            </div>

            {/* Separator between content */}
            <div className="border-t border-gray-300 my-4"></div>

            {/* Rating */}
            <div className="flex justify-center mt-2 space-x-1">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
            </div>

            {/* View More Button */}
            <div className="mt-4 text-center">
              <button
                onClick={() => openModal(award)}
                className="text-blue-500 hover:text-blue-700 flex items-center justify-center font-semibold"
              >
                <span>Read More</span>
                <FaArrowRight className="ml-2 text-xl" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Separator for Professional Look */}
      <div className="my-8 border-t border-gray-300"></div>

      {/* Modal for Award Details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        {selectedAward && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">{selectedAward.title}</h2>
            {selectedAward.mediaThumbnails && (
              <img
                src={`https://reality-demo.onrender.com${selectedAward.mediaThumbnails}`}
                alt={selectedAward.title}
                className="w-full h-64 object-cover rounded-lg mb-4 border border-gray-300"
              />
            )}
            <p className="text-gray-600 mb-4">{selectedAward.description}</p>
            <div className="text-center">
              <button
                onClick={closeModal}
                className="bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-900"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Awards;

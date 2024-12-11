import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaStar, FaStarHalf } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch testimonials data
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/testimonials/all");
        const data = await response.json();

        if (response.ok) {
          setTestimonials(data.data); // Assuming API returns testimonials under `data`
        } else {
          setError("Failed to fetch testimonials.");
        }
      } catch (error) {
        setError("An error occurred while fetching testimonials.");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading testimonials...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-orange-600 mb-8">What Our Clients Say</h1>

      {/* Testimonials Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl border-t-4 border-orange-500"
          >
            {/* Quote Icon */}
            <div className="text-gray-500 text-5xl flex justify-center mb-2">
              <FaQuoteLeft />
            </div>

            {/* Testimonial Content */}
            <p className="text-center text-gray-700 italic mb-4">"{testimonial.description}"</p>

            {/* Ratings */}
            <div className="flex items-center justify-center mb-4 space-x-1">
              {/* Display the full stars based on ratings */}
              {Array.from({ length: Math.floor(testimonial.ratings) }).map((_, i) => (
                <FaStar key={i} className="text-orange-500" />
              ))}

              {/* Display the half star if there's a fractional rating */}
              {testimonial.ratings % 1 >= 0.5 && <FaStarHalf className="text-orange-500" />}

              {/* Display the empty stars to make the total always 5 */}
              {Array.from({ length: 5 - Math.ceil(testimonial.ratings) }).map((_, i) => (
                <FaStar key={testimonial.ratings + i} className="text-gray-300" />
              ))}
            </div>

            {/* Client Info */}
            <p className="text-center font-semibold text-orange-600">{testimonial.name}</p>
            <p className="text-center text-gray-400">{testimonial.designation}</p>
          </div>
        ))}
      </div>

      {/* Footer Separator */}
      <div className="mt-12 border-t border-gray-300 pt-8 flex justify-center items-center space-x-2">
        <FaQuoteRight className="text-orange-500 text-3xl" />
        <h2 className="text-2xl font-bold text-gray-600">Client Testimonials</h2>
        <FaQuoteRight className="text-orange-500 text-3xl" />
      </div>
    </div>
  );
};

export default Testimonials;

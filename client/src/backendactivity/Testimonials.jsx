import React, { useState } from "react";
import {toast,Toaster} from "react-hot-toast"
const TestimonialsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    ratings: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/v1/testimonials/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
         toast.success(data.message);
        setFormData({ name: "", designation: "", ratings: "", description: "" });
      } else {
        setMessage("Failed to submit testimonial: " + (data.message || "Unknown error"));
      }
    } catch (error) {
       toast.error("Netwrok issue Please Check Your Internet Connection");
    }
  };

  return (
    <div className="max-w-lg mx-auto   p-8 rounded-lg  ">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Add Testimonial</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("Failed") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="designation" className="block text-gray-700 font-semibold mb-2">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
            placeholder="Enter your designation"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="ratings" className="block text-gray-700 font-semibold mb-2">
            Ratings (0.5 - 5)
          </label>
          <input
            type="number"
            id="ratings"
            name="ratings"
            value={formData.ratings}
            onChange={handleChange}
            step="0.5"
            min="0.5"
            max="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
            placeholder="Enter your rating"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-orange-300"
            placeholder="Write your testimonial here..."
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 focus:ring focus:ring-orange-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestimonialsForm;

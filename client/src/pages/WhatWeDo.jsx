import React, { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const WhatWeDo = () => {
  const [whatWeDo, setWhatWeDo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data from API
  useEffect(() => {
    const fetchWhatWeDo = async () => {
      try {
        const response = await fetch('https://reality-demo.onrender.com/api/v1/about');
        const data = await response.json();
        if (response.ok) {
          setWhatWeDo(data.data[0]); // Assuming there's only one document
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchWhatWeDo();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 rounded-xl">
      {/* Services Section */}
      <div className="space-y-8">
        <h3 className="text-4xl font-semibold text-gray-800 text-center mb-8">Our Services</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatWeDo?.services?.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-orange-500 to-orange-300 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <FaCheckCircle className="text-white text-3xl mr-4" />
                <h4 className="text-2xl font-semibold text-black">{service.title}</h4>
              </div>
              <p className="text-lg text-gray-800">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="w-full border-t-2 border-gray-300 mt-8 mb-8"></div>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h3>
          <p className="text-lg text-gray-600">{whatWeDo?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;

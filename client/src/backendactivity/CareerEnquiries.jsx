import React, { useState, useEffect } from 'react';

const CareerEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [searchExperience, setSearchExperience] = useState('');
  const [searchJobTitle, setSearchJobTitle] = useState('');

  // Fetch data from the API
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/career/all-enquiries')
      .then((response) => {
        console.log('API Response:', response); // Log the response object to inspect it
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Data:', data); // Log the parsed data to see the structure
        if (data.success) {
          setEnquiries(data.data); // Assuming 'data' contains the 'data' field
        } else {
          console.error('Failed to fetch career enquiries');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Filter enquiries based on search input
  const filteredEnquiries = enquiries.filter((enquiry) => {
    return (
      enquiry.experiencelevel.toLowerCase().includes(searchExperience.toLowerCase()) &&
      enquiry.jobTitle.toLowerCase().includes(searchJobTitle.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Career Enquiries</h1>

      {/* Search Filters */}
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Experience Level"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchExperience}
            onChange={(e) => setSearchExperience(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Job Title"
            className="w-full p-2 border border-gray-300 rounded"
            value={searchJobTitle}
            onChange={(e) => setSearchJobTitle(e.target.value)}
          />
        </div>
      </div>

      {/* Career Enquiries Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Resume</th>
              <th className="p-3">Job Title</th>
              <th className="p-3">Experience Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-t">
                  <td className="p-3">{enquiry.name}</td>
                  <td className="p-3">{enquiry.email}</td>
                  <td className="p-3">{enquiry.phone}</td>
                  <td className="p-3">
                    {/* Download Resume link */}
                    <a
                      href={`http://localhost:8000/${enquiry.resume}`}
                      download={`${enquiry.name}_resume.pdf`} // Ensure the file name is provided with a proper extension
                      className="text-blue-600"
                    >
                      Download Resume
                    </a>
                  </td>
                  <td className="p-3">{enquiry.jobTitle}</td>
                  <td className="p-3">{enquiry.experiencelevel}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareerEnquiries;

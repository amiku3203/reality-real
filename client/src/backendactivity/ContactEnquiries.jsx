import React, { useState, useEffect } from 'react';

const EnquiriesTable = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch enquiries from the API
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/contact/get-enquiries');
        const data = await response.json();

        if (data.success) {
          setEnquiries(data.data);
        } else {
          setError('Failed to fetch enquiries.');
        }
      } catch (err) {
        setError('Error fetching enquiries.');
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Contact Enquiries</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Mobile</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">Message</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  <tr key={enquiry._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700">{enquiry.name}</td>
                    <td className="p-3 text-sm text-gray-700">{enquiry.email}</td>
                    <td className="p-3 text-sm text-gray-700">{enquiry.mobile}</td>
                    <td className="p-3 text-sm text-gray-700">{enquiry.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-sm text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnquiriesTable;

import React, { useContext, useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast'; // Import toast for notifications
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';
import Context from '../context';
 
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const {fetchUserDetails} = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation check
    if (!email || !password) {
      toast.error('Email and Password are required'); // Show error notification
      return;
    }

    try {
      const response = await fetch( SummaryApi.signIn.url, {
        method: SummaryApi.signIn.method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log("hello",data);
      if (response.ok) {
        toast.success('Login successful');  
        navigate('/admin');
        fetchUserDetails();
      } else {
        // toast.error(data.message || 'Login failed'); // Show error notification
      }
    } catch (err) {
      // toast.error('An error occurred during login'); // Show error notification
    }
  };

  return (
    <div className="h-screen  flex justify-center items-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full sm:w-[500px] transform transition-all duration-700 ease-out scale-105 hover:scale-110">
        <h2 className="text-3xl font-semibold text-orange-500 mb-8 text-center animate__animated animate__fadeInUp">
          Sign In
        </h2>
<Toaster/>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:ring-2 focus:ring-orange-500">
              <FaUser className="ml-3 text-gray-500" />
              <input
                type="email"
                className="w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md transition-all duration-300 ease-in-out focus:ring-2 focus:ring-orange-500">
              <FaLock className="ml-3 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <div
                className="cursor-pointer text-xl ml-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 px-4 rounded-md hover:bg-orange-600 transition-colors transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default SignIn;

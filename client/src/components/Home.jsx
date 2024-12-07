import React, { useState ,useEffect} from 'react';
import { FaSearch, FaCity } from 'react-icons/fa';
import { MdHome, MdOutlineHomeWork } from 'react-icons/md';
import bgimage from "../assets/bg.jpg";
import FeaturedCollection from './FeaturedCollection';
import TrendingProjects from './TrendingProjects';
import TopProjects from './TopProject';
import SearchContent from './SearchJ';

const Home = () => {
    const [activeOption, setActiveOption] = useState('buy');
    const [city, setCity] = useState('');
    const [keyword, setKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
 

    const [cities, setCities] = useState([]);

    // Fetch Cities from API
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
  
    useEffect(() => {
      fetchCities();
    }, []);
  
    // Handle Search
    const handleSearch = async (e) => {
        e.preventDefault();
        
        if (!city && !keyword) {
            alert("Please enter a city or keyword.");
            return;
        }

        setLoading(true);

        try {
            // Construct the search query
            const query = new URLSearchParams();
            if (city) query.append("city", city);
            if (keyword) query.append("keyword", keyword);

            
            // Make the fetch request to the backend API
            const response = await fetch(`https://reality-demo.onrender.com/api/v1/project/search?${query.toString()}`);
            console.log("response", response);
            if (!response.ok) {
                throw new Error("Failed to fetch search results");
            }
            const data = await response.json();

            // Set search results to state
            setSearchResults(data);
        } catch (error) {
            console.error("Error during search:", error);
            // alert("An error occurred during the search.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="bg-cover bg-center font-serif h-screen flex items-center justify-center bg-fixed shadow-2xl relative overflow-hidden"
                style={{ backgroundImage: `url(${bgimage})` }}
            >
                {/* Overlay for background to improve text visibility */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="w-full max-w-7xl mx-4 p-6 sm:p-8 rounded-lg transform   transition-all duration-500 ease-in-out relative z-10 shadow-2xl text-center">
                    {/* Title and Description */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-lg animate__animated animate__fadeIn animate__delay-1s">
                        FIND YOUR DREAM INVESTMENT
                    </h1>
                    <p className="mt-4 sm:mt-6 text-white font-thin tracking-widest text-sm sm:text-base animate__animated animate__fadeIn animate__delay-3s">
                        <span className="bg-black bg-opacity-30 px-2 py-1">Experience Real Estate A Whole New Way. Get Started Now!</span>
                    </p>

                    {/* Form for Search Options */}
                    <form onSubmit={handleSearch} className="mt-8 p-6 bg-orange-400 rounded shadow-lg space-y-4">
                        {/* Option Selection (First Row) */}
                        <div className="flex bg-white p-2 rounded shadow-inner w-full mb-4">
                            <button
                                type="button"
                                onClick={() => setActiveOption('buy')}
                                className={`flex items-center justify-center  w-1/2 p-2 text-center font-bold ${
                                    activeOption === 'buy' ? 'bg-blue-600 text-white' : 'text-gray-600'
                                }`}
                            >
                                <MdHome className="mr-2" /> Buy
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveOption('rent')}
                                className={`flex items-center justify-center  w-1/2 p-2 text-center font-bold ${
                                    activeOption === 'rent' ? 'bg-blue-600 text-white' : 'text-gray-600'
                                }`}
                            >
                                <MdOutlineHomeWork className="mr-2" /> Rent
                            </button>
                        </div>

                        {/* Row with City, Keyword, Search, and Clear Buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 items-center">
                            {/* City Dropdown with Icon */}
                            <div className="flex items-center bg-white p-2 rounded shadow-inner md:col-span-2">
                                <FaCity className="text-gray-500 mr-2" />
                                <select
                className="col-span-3  rounded-lg px-4 py-2     focus:outline-none"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              >
                <option value="" disabled>
                  Select City
                </option>
                {cities.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
                            </div>

                            {/* Search Keyword Input */}
                            <div className="flex items-center bg-white p-2 rounded shadow-inner md:col-span-4">
                                <input
                                    type="text"
                                    placeholder="Enter a location, builder, project, or RERA ID"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="w-full bg-transparent text-gray-700 focus:outline-none"
                                />
                            </div>

                            {/* Search Button */}
                            <button
                                type="submit"
                                className="flex items-center justify-center bg-blue-600 text-white font-bold text-sm md:text-base rounded shadow-inner p-2 hover:bg-blue-500 transition md:col-span-1"
                            >
                                {loading ? 'Searching...' : <><FaSearch className="mr-2" /> Search</>}
                            </button>

                            {/* Clear Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    setCity('');
                                    setKeyword('');
                                    setActiveOption('buy');
                                    setSearchResults([]); // Clear search results
                                }}
                                className="flex items-center justify-center w-full bg-red-600 text-white font-bold text-sm md:text-base rounded shadow-inner p-2 hover:bg-red-500 transition md:col-span-1"
                            >
                                Clear
                            </button>
                        </div>
                    </form>

                    {/* Search Results */}
                    <div className="mt-8">
                        {loading ? (
                            <p className="text-white">Loading...</p>
                        ) : (
                            <ul className="space-y-4">
                                 <SearchContent projects={searchResults}/>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            <FeaturedCollection />
            <TrendingProjects />
            <TopProjects />
        </>
    );
};

export default Home;

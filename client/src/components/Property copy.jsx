import React, { useState } from 'react';
import { FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

// Regular Project Card for non-mandate projects
const ProjectCard = ({ image, title, location, area, price, status }) => {
    return (
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Image Section */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <button className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
                    Get Callback
                </button>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

                {/* Location and Area with Separator */}
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3 border-b border-gray-200 pb-2">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center">
                        <span>{area} Sq. mt.</span>
                    </div>
                </div>

                {/* Price and Status with Separator */}
                <div className="flex items-center justify-between mt-3 text-sm border-b border-gray-200 pb-2">
                    <div className="text-right text-purple-700 font-semibold">
                        {price ? (
                            <span>
                                <FaRupeeSign className="inline" /> {price}
                            </span>
                        ) : (
                            <span className="text-red-500">On Request</span>
                        )}
                    </div>
                    <div className="text-sm text-gray-500">{status}</div>
                </div>

                {/* View Details Button */}
                <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg shadow-md hover:bg-purple-800 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    );
};

// Mandate Project Card for mandate-specific details
const MandateProjectCard = ({ image, title, location }) => {
    // Generate a random price for mandate projects
    const randomPrice = (Math.floor(Math.random() * 10) + 1) * 1000000;

    return (
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Image Section */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-48 object-cover" />
                <button className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
                    Get Callback
                </button>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

                {/* Location Section */}
                <div className="flex items-center text-sm text-gray-500 mt-2 space-x-3 border-b border-gray-200 pb-2">
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>{location}</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="flex items-center justify-between mt-3 text-sm border-b border-gray-200 pb-2">
                    <div className="text-right text-purple-700 font-semibold">
                        <span>
                            <FaRupeeSign className="inline" /> {randomPrice.toLocaleString()}
                        </span>
                    </div>
                </div>

                {/* Book Now Button */}
                <button className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg shadow-md hover:bg-purple-800 transition-colors">
                    Book Now
                </button>
            </div>
        </div>
    );
};

// Main Gallery Component
const ProjectGallery = () => {
    const [selectedTab, setSelectedTab] = useState('all'); // State to track the selected tab

    const allProjects = [
        {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },
        {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },
        {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },
        {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Max Estates 128, Sector 128, Noida',
            location: 'Sector 128, Noida',
            area: '219.65 - 428.60',
            price: 'On Request',
            status: 'Under Construction',
            isMandate: false, // Add mandate flag
        },
        {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },
        {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },  {
            image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'Godrej Reserve, Kandivali East, Mumbai',
            location: 'Kandivali East, Mumbai',
            area: '65.28 - 174.02',
            price: '2.35 Cr.* Onwards',
            status: 'Under Construction',
            isMandate: true, // Mark as mandate
        },
        // Add more projects...
    ];

    // Filter projects based on the selected tab
    const filteredProjects = selectedTab === 'mandate' ? allProjects.filter(project => project.isMandate) : allProjects;

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setSelectedTab('all')}
                    className={`px-4 py-2 rounded-t-lg shadow-md ${selectedTab === 'all' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    All Projects
                </button>
                <button
                    onClick={() => setSelectedTab('mandate')}
                    className={`px-4 py-2 rounded-t-lg shadow-md ml-2 ${selectedTab === 'mandate' ? 'bg-purple-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Mandate Projects
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" style={{ marginLeft: "10%", marginRight: "10%" }}>
                {filteredProjects.map((project, index) => (
                    project.isMandate ? (
                        <MandateProjectCard key={index} {...project} />
                    ) : (
                        <ProjectCard key={index} {...project} />
                    )
                ))}
            </div>
        </div>
    );
};

export default ProjectGallery;

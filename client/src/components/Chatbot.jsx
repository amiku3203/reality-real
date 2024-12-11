import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Chatbot = ({ isOpen, toggleChatbot }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [cities, setCities] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypology, setSelectedTypology] = useState("");
  const [selectedPossession, setSelectedPossession] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [propertyTypes, setPropertyTypes] = useState({
    
      Residential: [
        { value: "Apartment", label: "Apartments" },
        { value: "Villas", label: "Villas" },
        { value: "Residential-Plots", label: "Residential-Plot" },
        { value: "Independnt-Floor", label: "Independnt-Floor" },
        { value: "Residential-Studio", label: "Residential-Studio" },
        { value: "Residential-Prereleased", label: "Residential-Prereleased" },
        { value: "Other Residential", label: "Other Residential" },
      ],
      Commercial: [
        { value: "Commercial-Plots", label: "Commercial-Plots" },
        { value: "Commercial-Studio", label: "Commercial-Studio" },
        { value: "Office-Space", label: "Office-Space" },
        { value: "Food-Court", label: "Food-Court" },
        { value: "High-Street-Retails", label: "High-Street-Retails" },
        { value: "Shops", label: "Shops" },
        { value: "Shops-Showrooms", label: "Shops-Showrooms" },
        { value: "Commercial-Prerelease", label: "Commercial-Prereleased" },
        { value: "Other", label: "Other" },
      ],
    
  
  });

  const [questions, setQuestions] = useState([]);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/city/cities");
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.cities);
      } catch (error) {
        console.error("Error fetching cities:", error.message);
      }
    };
    fetchCities();
  }, []);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/project/getAllProjects");
        const data = await response.json();
        setProjects(data || []);
        setFilteredProjects(data || []); // Initialize filteredProjects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Initialize questions dynamically
  useEffect(() => {
    setQuestions([
      {
        id: 1,
        question: "Which city?",
        options: cities.map((city) => city.name),
        nextId: 2,
      },
      {
        id: 2,
        question: "Which property type?",
        options: Object.keys(propertyTypes),
        nextId: 3,
      },
      {
        id: 3,
        question: "Which property category?",
        options: [], // Will be updated dynamically based on property type
        nextId: null,
      },
    ]);
  }, [cities]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (option) => {
    const updatedAnswers = [
      ...answers,
      { question: currentQuestion.question, answer: option },
    ];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex === 1 && option in propertyTypes) {
      // Update the next question dynamically based on selected property type
      const updatedQuestions = [...questions];
      updatedQuestions[2].options = propertyTypes[option].map(
        (type) => type.label
      );
      setQuestions(updatedQuestions);
    }

    if (currentQuestion.nextId !== null) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(null); // End the chat
    }
  };

  // Restart chat function
  const restartChat = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setFilteredProjects([]);
    setSelectedCity("");
    setSelectedType("");
    setSelectedTypology("");
    setSelectedPossession("");
    setSelectedStatus("");
  };

  // Combine all answers into an object
  const combinedAnswers = answers.reduce((acc, { question, answer }) => {
    if (question === "Which city?") {
      acc["city"] = answer;
    } else if (question === "Which property type?") {
      acc["type"] = answer;
    } else if (question === "Which property category?") {
      acc["category"] = answer;
    } else {
      acc[question] = answer;
    }
    return acc;
  }, {});

  const applyFilters = () => {
    const { city, type, category } = combinedAnswers;

    // Ensure all filters are set before applying them
    if (!city || !type || !category) {
      console.log("Missing filter criteria. Aborting filter.");
      return;
    }

    const filtered = projects.filter((project) => {
      const cityMatch = project.city === city;
      const typeMatch = project.PropertyType === category;
      const categoryMatch = project.PropertyCategory === type;
      // console.log("check1",project.PropertyType);
      // console.log("check2",category);
      console.log(cityMatch);
      console.log(typeMatch);
      console.log(categoryMatch);
      return cityMatch && typeMatch && categoryMatch;
    });

    // Set the filtered projects in the state
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    if (combinedAnswers.city && combinedAnswers.type && combinedAnswers.category) {
      applyFilters();
    }
  }, [combinedAnswers]);

  return (
    <div
      className={`fixed bottom-20 right-5 bg-white rounded-lg shadow-lg transition-transform duration-300 ${
        isOpen ? "transform scale-100" : "transform scale-0"
      } w-96 max-h-[30rem] overflow-hidden z-50`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <h2 className="text-xl font-extrabold tracking-wide">
          THE BEST WAY TO FIND YOUR HOME
        </h2>
        <button onClick={toggleChatbot}>
          <AiOutlineClose className="text-2xl" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 overflow-y-scroll h-[calc(100%-6rem)]">
        {currentQuestion ? (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {currentQuestion.question}
            </h3>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="block w-full mb-2 p-2 bg-gradient-to-r from-blue-100 to-purple-100 hover:from-blue-200 hover:to-purple-200 rounded-lg text-left text-gray-800 shadow-md transition-all"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div>
            
             
            {filteredProjects.length > 0 ? (
  <div>
    <h4 className="text-lg font-semibold mb-4 text-gray-800">
      Filtered Projects:
    </h4>
    <div className="overflow-x-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {filteredProjects.map((project) => (
      <Link
        to={`/properties/${project.slug}`}
        key={project.id}
        className="flex flex-col bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-300"
        style={{ minWidth: "280px" }} // Ensures cards have a minimum width
      >
        <div className="relative">
          <img
            src={`http://localhost:8000/${project.thumbnail}`}
            alt={project.ProjectName}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {project.PropertyType}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">
            {project.ProjectName}
          </h3>
          <div className="mt-2 flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-1 text-blue-500" />
            {project.city}, {project.locality}
          </div>
         
        </div>
      </Link>
    ))}
  </div>
</div>

  </div>
) : (
  <p className="text-gray-600">No projects found based on your filters.</p>
)}

            <button
              onClick={restartChat}
              className="mt-4 w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Restart Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;

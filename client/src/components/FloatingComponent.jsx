import React from "react";
import { AiOutlineMessage } from "react-icons/ai";

const FloatingChatButton = ({ toggleChatbot }) => {
    return (
        <button
            onClick={toggleChatbot}
            className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all z-50"
        >
            <AiOutlineMessage className="text-2xl" />
        </button>
    );
};

export default FloatingChatButton;

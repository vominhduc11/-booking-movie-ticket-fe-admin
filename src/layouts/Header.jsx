// Updated Header.jsx - Only adding the relevant part for sidebar toggle
import React from 'react';
import { FaBars } from 'react-icons/fa';
// Other imports remain the same...

const Header = ({ onToggleSidebar }) => {
    // All other state and functions remain the same...

    return (
        <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 z-10 relative">
            {/* Left side - Menu toggle and Logo */}
            <div className="flex items-center">
                <button
                    className="text-gray-600 hover:text-gray-800 p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 mr-3"
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaBars className="text-lg" />
                </button>
                <h1 className="text-xl font-bold text-gray-800">
                    <span className="text-blue-600">Cinema</span> Admin
                </h1>
            </div>

            {/* Rest of the header remains the same... */}
        </header>
    );
};

export default Header;

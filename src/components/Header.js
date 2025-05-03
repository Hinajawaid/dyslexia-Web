import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between w-full z-10">
      {/* Left side - Title */}
      <div className="text-2xl font-bold text-gray-800"></div>

      {/* Right side - User Icon */}
      <div className="flex items-center">
        <div className="bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center cursor-pointer transition-colors">
          <FaUser className="text-gray-600 text-lg md:text-xl" />
        </div>
        {/* Add other header items like notifications or settings here if needed */}
      </div>
    </header>
  );
};

export default Header;

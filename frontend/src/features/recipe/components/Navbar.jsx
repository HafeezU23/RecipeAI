import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ setIsSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between h-20 px-6 lg:px-10 border-b border-gray-100">
        <div className="block lg:hidden">
            <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} className="text-xl" />
      </button>

        </div>
      
      <div className="hidden lg:block text-gray-400">
        <FontAwesomeIcon
          icon={faBars}
          className="text-xl cursor-pointer hover:text-gray-700 transition-colors"
        />
      </div>
    </header>
  );
};

export default Navbar;
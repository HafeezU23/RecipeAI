import React from "react";
import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../../../config/firebase";
import {
  faHouse,
  faWandMagicSparkles,
  faClockRotateLeft,
  faHeart,
  faUser,
  faGear,
  faArrowRightFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../store/features/auth/authSlice";
const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    await auth.signOut();
    dispatch(setLogout());
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50 lg:border-none">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="RecipeAI Logo" className="h-8 w-8" />
            <span className="text-xl font-bold text-gray-900 tracking-wide">
              RecipeAI
            </span>
          </div>
          <button
            className="lg:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faXmark} className="text-xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/home"
            end
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#f0f7ec] text-[#539144]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FontAwesomeIcon icon={faHouse} className="text-lg w-5" />
            Home
          </NavLink>
          <NavLink
            to="/home/generate"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#f0f7ec] text-[#539144]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              className="text-lg w-5"
            />
            Generate Recipe
          </NavLink>
          <NavLink
            to="/home/history"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#f0f7ec] text-[#539144]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FontAwesomeIcon icon={faClockRotateLeft} className="text-lg w-5" />
            History
          </NavLink>
          <NavLink
            to="/home/settings"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${
                isActive
                  ? "bg-[#f0f7ec] text-[#539144]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <FontAwesomeIcon icon={faGear} className="text-lg w-5" />
            Settings
          </NavLink>
        </nav>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <button
          
            onClick={handleLogout}
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="text-lg w-5"
            />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

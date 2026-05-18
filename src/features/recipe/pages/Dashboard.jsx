import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { NavLink } from "react-router";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const RecentRecipes = useSelector((state) => state.recipe);
  const recipes =  RecentRecipes.recipes.slice(0, 4);
  
  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
          Hi, {user?.fullname}👋
        </h1>
        <p className="text-gray-500">What would you like to cook today?</p>
      </div>

      {/* Generate Banner */}
      <div className="relative bg-[#f8f9f4] rounded-3xl p-6 lg:p-10 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-sm">
        <div className="relative z-10 w-full md:w-3/5 lg:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Generate Recipe</h2>
          <p className="text-gray-500 text-sm md:text-base">
            Enter the ingredients you have and let AI do the magic.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <NavLink to='/home/generate' className="bg-[#539144] hover:bg-[#437736] text-white px-6 py-3.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap">
              <FontAwesomeIcon icon={faWandMagicSparkles} />
              Generate
            </NavLink>
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:absolute md:-right-10 lg:right-0 md:top-1/2 md:-translate-y-1/2 hidden md:block w-full md:w-1/2 h-48 md:h-[120%]">
          <img
            src="/hero-img.png"
            alt="Delicious food bowl"
            className="w-full h-full object-cover object-left md:object-center rounded-2xl  md:rounded-full md:scale-110"
          />
        </div>
      </div>

      {/* Popular Suggestions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Recent Recipes</h3>
          <NavLink
            to="/home/history"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            View all
          </NavLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <RecipeCard recipes={recipes} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

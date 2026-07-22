import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import RecipeHistoryCard from '../components/RecipeHistoryCard';
import { useSelector } from 'react-redux';
const History = () => {

  const historyData = useSelector((state)=>state.recipe.recipes)
  
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Recipe History</h1>
          <p className="text-gray-500 text-sm">View all your previously generated recipes.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Search recipes..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] text-sm"
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        </div>
      </div>

      {/* List section */}
      <div className="space-y-3">
        <RecipeHistoryCard recipes={historyData} />
      </div>
    </div>
  );
}

export default History;

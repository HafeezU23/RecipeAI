import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faWandMagicSparkles,
  faTimes,
  faBookmark,
  faShareNodes,
  faClock,
  faUserGroup,
  faFire,
  faBasketShopping,
  faListOl,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import ViewRecipe from "../components/ViewRecipe";
import { generate } from "../services/recipe.api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addRecipe,
  setCurrentRecipe,
  setRecipes,
} from "../../../store/features/recipe/recipeSlice";

const GenerateRecipe = () => {
  // Simple logic states
  const [inputValue, setInputValue] = useState("");
  const [showRecipe, setShowRecipe] = useState(false); // Set to true to see the design immediately
  const [loading, setLoading] = useState(false); // Set to true to see the design immediately

  const [generatedRecipe, setGeneratedRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleAddIngredient = () => {
      const ingredient = inputValue.split(",").map((item) => item.trim());
      setIngredients(ingredient);
    };

    if (inputValue) {
      handleAddIngredient();
    }
  }, [inputValue]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login to generate recipe");
      return;
    }
    if (!ingredients.length) {
      toast.error("Please enter at least one ingredient");
      return;
    }
    try {
      setLoading(true);
      const response = await generate({ ingredients, firebaseToken: token });

      if (response.success) {
        setGeneratedRecipe(response.data);
        dispatch(addRecipe(response.data));
        dispatch(setCurrentRecipe(response.data));
        setShowRecipe(true);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Generate Recipe
          </h1>
          <p className="text-gray-500">
            Enter the ingredients you have and let AI create a delicious recipe
            for you.
          </p>
        </div>
      </div>

      {/* Input & Tips Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col lg:flex-row gap-8">
        {/* Left Side: Input Area */}
        <div className="flex-1 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Your Ingredients
            </h2>
            <p className="text-sm text-gray-500">
              Enter ingredients separated by commas or press Enter
            </p>
          </div>
          
          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="e.g. chicken, rice, onion, tomato, garlic"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#539144] focus:ring-1 focus:ring-[#539144] shadow-sm"
          />

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 bg-[#539144] hover:bg-[#437736] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Generate Recipe
          </button>
        </div>

        {/* Right Side: Tips */}
        <div className="w-full lg:w-80 bg-green-50/50 rounded-2xl p-6 border border-green-100/50">
          <h3 className="flex items-center gap-2 font-bold text-green-800 mb-4">
            <span className="text-xl">💡</span> Tips
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mt-0.5"
              />
              Enter at least 2 ingredients
            </li>
            <li className="flex items-start gap-2">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mt-0.5"
              />
              Be specific for better results
            </li>
            <li className="flex items-start gap-2">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mt-0.5"
              />
              Include spices for more flavor
            </li>
            <li className="flex items-start gap-2">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 mt-0.5"
              />
              Example: chicken, rice, onion
            </li>
          </ul>
        </div>
      </div>

      {/* Generated Recipe Section (Conditionally Rendered) */}
      {loading && (
        <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-2xl mt-8">
          <p>Generating recipe...</p>
        </div>
)}
      { showRecipe && (
        <ViewRecipe recipe={generatedRecipe} />
      )}

      {!loading && !showRecipe && (
        <div className="text-center text-gray-500 py-8 bg-gray-100 rounded-2xl mt-8">
          <p>waiting for ingredients</p>
        </div>
      )}
    </div>
  );
};

export default GenerateRecipe;

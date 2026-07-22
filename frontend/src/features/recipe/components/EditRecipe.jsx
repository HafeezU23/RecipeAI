import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faImage,
  faClock,
  faFire,
  faBasketShopping,
  faListOl,
  faPlus,
  faTrash,
  faSave,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateRecipeById } from "../services/recipe.api";
import { updateRecipe, setCurrentRecipe } from "../../../store/features/recipe/recipeSlice";


const EditRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
 
  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredientsUsed, setIngredientsUsed] = useState([]);
  const [instructions, setInstructions] = useState([]);
  


  const currentRecipe = useSelector((state) => state.recipe.currentRecipe);

  useEffect(() => {
    if (currentRecipe) {
      setTitle(currentRecipe.title || '');
      setPrepTime(currentRecipe.prepTime || '');
      setDifficulty(currentRecipe.difficulty || '');
      setImageUrl(currentRecipe.imageUrl || '');
      setIngredientsUsed(currentRecipe.ingredientsUsed || []);
      setInstructions(currentRecipe.instructions || []);
    }
  }, [currentRecipe]);


  const handleAddIngredient = () => {
    setIngredientsUsed([...ingredientsUsed, ""]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredientsUsed.filter((_, i) => i !== index);
    setIngredientsUsed(newIngredients);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredientsUsed];
    newIngredients[index] = value;
    setIngredientsUsed(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleRemoveInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index);
    setInstructions(newInstructions);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title,
        prepTime,
        difficulty,
        imageUrl,
        ingredientsUsed,
        instructions,
      };
      const response = await updateRecipeById(currentRecipe._id, updatedData, token);
      dispatch(updateRecipe(response.recipe));
      dispatch(setCurrentRecipe(response.recipe));
      toast.success("Recipe updated successfully");
      navigate(`/home/recipe/${currentRecipe._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  

  return (
    <div className="space-y-6 pt-4 max-w-4xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <NavLink to={-1} className="text-sm text-gray-500 hover:text-gray-900 mb-2 flex items-center gap-2 transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Recipe
          </NavLink>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-1">
            <FontAwesomeIcon icon={faPen} className="text-[#539144]" />
            Edit Recipe
          </h2>
          <p className="text-sm text-gray-500">
            Update your recipe details, ingredients, and steps.
          </p>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[#539144] hover:bg-[#437836] text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            <FontAwesomeIcon icon={faSave} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* General Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faPen} className="text-gray-400" />
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#539144]/20 focus:border-[#539144] transition-all"
                placeholder="e.g. Spicy Chicken Curry"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faImage} className="text-gray-400" />
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={imageUrl}
                onChange={(e)=>setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#539144]/20 focus:border-[#539144] transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                Prep Time
              </label>
              <input
                type="text"
                name="prepTime"
                value={prepTime}
                onChange={(e)=>setPrepTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#539144]/20 focus:border-[#539144] transition-all"
                placeholder="e.g. 45 mins"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faFire} className="text-gray-400" />
                Difficulty
              </label>
              <select
                name="difficulty"
                value={difficulty}
                onChange={(e)=>setDifficulty(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#539144]/20 focus:border-[#539144] transition-all bg-white"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Ingredients Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faBasketShopping} className="text-[#539144]" />
                Ingredients
              </label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-sm text-[#539144] font-medium hover:text-[#437836] flex items-center gap-1.5 transition-colors bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Ingredient
              </button>
            </div>
            <div className="space-y-3">
              {ingredientsUsed.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-gray-400 font-medium w-6 text-center">{index + 1}.</span>
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#539144]/20 focus:border-[#539144] transition-all"
                    placeholder={`Ingredient ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {ingredientsUsed.length === 0 && (
                <p className="text-sm text-gray-500 italic pl-9">No ingredients added yet.</p>
              )}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Instructions Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FontAwesomeIcon icon={faListOl} className="text-[#539144]" />
                Instructions
              </label>
              <button
                type="button"
                onClick={handleAddInstruction}
                className="text-sm text-[#539144] font-medium hover:text-[#437836] flex items-center gap-1.5 transition-colors bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg"
              >
                <FontAwesomeIcon icon={faPlus} /> Add Step
              </button>
            </div>
            <div className="space-y-3">
              {instructions.map((step, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <div className="flex-none w-8 h-8 rounded-full bg-green-50 text-[#539144] font-bold flex items-center justify-center text-sm mt-1">
                    {index + 1}
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                    rows={2}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#539144]/20 focus:border-[#539144] transition-all resize-none"
                    placeholder={`Step ${index + 1} instructions...`}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveInstruction(index)}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
              {instructions.length === 0 && (
                <p className="text-sm text-gray-500 italic pl-11">No instructions added yet.</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;

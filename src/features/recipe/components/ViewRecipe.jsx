import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faClock,
  faFire,
  faPen,
  faBasketShopping,
  faListOl,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteRecipeById } from "../services/recipe.api";
import { toast } from "react-toastify";
import {
  deleteRecipe,
  setCurrentRecipe,
} from "../../../store/features/recipe/recipeSlice";
const ViewRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipe = useSelector((state) => state.recipe.currentRecipe);
  const token = useSelector((state) => state.auth.token);
  const handleDelete = async () => {
    try {
      await deleteRecipeById(recipe._id, token);
      dispatch(deleteRecipe(recipe._id));
      toast.success("Recipe deleted successfully");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = () => {
    dispatch(setCurrentRecipe(recipe));
    navigate(`/home/recipe/edit/${recipe._id}`);
  };

  if (!recipe) {
    return (
      <div className="p-8 text-center text-gray-500">Loading recipe...</div>
    );
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 mb-1">
            <FontAwesomeIcon
              icon={faWandMagicSparkles}
              className="text-[#539144]"
            />
            Your Generated Recipe
          </h2>
          <p className="text-sm text-gray-500">
            AI generated recipe based on your ingredients
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-white border border-blue-200 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <FontAwesomeIcon icon={faPen} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Edit</span>
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-white border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
          >
            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
            <span className="text-sm font-medium text-red-900">Delete</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col md:flex-row gap-6 lg:gap-10">
        <div className="w-full md:w-1/2 lg:w-2/5 h-64 md:h-auto rounded-xl overflow-hidden shrink-0">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Recipe Info */}
        <div className="flex-1 space-y-6">
          {/* Title & Desc */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {recipe.title}
            </h3>
          </div>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-3 bg-green-50/60 px-4 py-2.5 rounded-xl border border-green-100/50">
              <FontAwesomeIcon
                icon={faClock}
                className="text-green-600 text-lg"
              />
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  {recipe.prepTime}
                </p>
                <p className="text-xs text-gray-500 leading-tight">Prep Time</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-orange-50/60 px-4 py-2.5 rounded-xl border border-orange-100/50">
              <FontAwesomeIcon
                icon={faFire}
                className="text-orange-500 text-lg"
              />
              <div>
                <p className="text-sm font-bold text-gray-900 leading-tight">
                  {recipe.difficulty}
                </p>
                <p className="text-xs text-gray-500 leading-tight">
                  Difficulty
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients List */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
              <FontAwesomeIcon
                icon={faBasketShopping}
                className="text-[#539144]"
              />
              Ingredients
            </h4>
            {recipe?.ingredientsUsed?.map((ingredient, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-y-2 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{" "}
                  {ingredient}
                </div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div>
            <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-3">
              <FontAwesomeIcon icon={faListOl} className="text-[#539144]" />
              Steps
            </h4>
            <ol className="list-decimal list-outside ml-4 space-y-2 text-sm text-gray-600">
              {recipe?.instructions?.map((step, index) => (
                <li key={index} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;

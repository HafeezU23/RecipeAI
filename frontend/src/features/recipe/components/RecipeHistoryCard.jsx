import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { viewRecipeById, deleteRecipeById } from "../services/recipe.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { setCurrentRecipe, deleteRecipe } from "../../../store/features/recipe/recipeSlice";
const RecipeHistoryCard = ({ recipes }) => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewRecipe = async (recipeId) => {
    try {
      const response = await viewRecipeById(recipeId, token);
      dispatch(setCurrentRecipe(response.recipe));
      navigate(`/home/recipe/${recipeId}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteRecipeById(itemId, token);
      dispatch(deleteRecipe(itemId));
      toast.success("Recipe deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (item) => {
    try {
      dispatch(setCurrentRecipe(item));
      navigate(`/home/recipe/edit/${item._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {recipes.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-shadow"
        >
          {/* Left side: Image and details */}
          <div className="flex items-center gap-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
                {item.ingredients.slice(0, 20)}....
              </p>
            </div>
          </div>

          {/* Right side: Date, Time and actions */}
          <div className="flex items-start justify-start md:justify-end gap-6 md:gap-8 w-full md:w-auto mt-4 md:mt-0">
            <div className="text-right flex-1 md:flex-none">
              <p className="text-sm text-gray-500">
                {new Date(item.createdAt).toDateString()}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(item.createdAt).toLocaleTimeString()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                onClick={() => handleViewRecipe(item._id)}
                className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                View
              </NavLink>
              <NavLink
                onClick={() => handleEdit(item)}
                className="px-4 py-1.5 border border-[#539144] rounded-lg text-sm font-medium text-[#539144] hover:bg-gray-50 transition-colors"
              >
                Edit
              </NavLink>
              <NavLink
                onClick={() => handleDelete(item._id)}
                className="px-4 py-1.5 border border-red-500 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Delete
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeHistoryCard;

import { setCurrentRecipe } from "../../../store/features/recipe/recipeSlice";
import { viewRecipeById } from "../services/recipe.api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
const RecipeCard = ({ recipes }) => {
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
  return (
    <>
      {recipes.map((recipe) => (
        <div
          onClick={()=>handleViewRecipe(recipe._id)}
          key={recipe._id}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
        >
          <div className="relative h-48 w-full">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h4 className="font-bold text-gray-900 mb-1 truncate">
              {recipe.title}
            </h4>
            <p className="text-sm text-gray-500">{recipe.prepTime}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default RecipeCard;

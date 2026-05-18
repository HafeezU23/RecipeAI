const { GoogleGenAI } = require("@google/genai"); 
const recipeModel = require('../models/recipe.model')
const getRecipeImage = require('../utils/getRecipeImage')
const ai = new GoogleGenAI({})

const generateRecipeController = async(req, res)=>{
   const {ingredients} = req.body;
   const {email_verified, uid} = req.user;
   
    if(!uid || email_verified != true){
      return res.status(401).json({
        message: "user not authorized, plzz verify your email"
      })
    }

  
    
   if(!ingredients || !ingredients.length){
         return res.status(201).json({
            message: "please enter ingredients to make a yummy recipe"
         })
   }
   
   try{
      const prompt = `You are a professional chef. I have the following ingredients: ${ingredients.join(', ')}.
      Create a delicious recipe using mostly these ingredients (you can assume I have basic pantry items like salt, pepper, oil, water).
      
      You MUST respond with ONLY a valid raw JSON object. Do not use markdown formatting like \`\`\`json. 
      The JSON must perfectly match this structure:
      {
        "title": "Recipe Name",
        "ingredientsUsed": ["ingredient 1", "ingredient 2"],
        "instructions": ["Step 1...", "Step 2..."],
        "prepTime": "XX mins",
        "difficulty": "Easy/Medium/Hard"
      }`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            systemInstruction: "You are a professional chef. Your name is Chef Gemini.",
        }
      })

       let aiResponse = response.text;

      if(!aiResponse){
         return res.status(500).json({
            message: "Failed to generate recipe"
         })
      }

      aiResponse = aiResponse.replace(/```json/g, "").replace(/```/g,"").trim()
       const recipeData = JSON.parse(aiResponse)
       
       let imageUrl=''
       if (recipeData.title){
       imageUrl = await getRecipeImage(recipeData.title)
       }



       const newRecipe = await recipeModel.create({
          firebaseUid: uid,
          ingredients: ingredients,
          title: recipeData.title,
          ingredientsUsed: recipeData.ingredientsUsed,
          instructions: recipeData.instructions,
          prepTime: recipeData.prepTime,
          difficulty: recipeData.difficulty,
          imageUrl: imageUrl
       })



    return res.status(200).json({
      success: true,
      message: "Recipe generated!",
      data: newRecipe
    });

   }catch(error){
      return res.status(500).json({
        message: `Failed to generate recipe: ${error}`
      })
   }

}

const getUserRecipiesController = async (req, res)=>{
    try{
        const uid = req.user.uid

        const recipes = await recipeModel.find({firebaseUid: uid}).sort({createdAt: -1})
        return res.status(201).json({
            success: true,
            message: "here are your recipes :",
            recipes:recipes
        })
    }catch(error){
        return res.status(401).json({
            message: `cant get recipes: ${error}`,
            
        })
    }
}

const getRecipeByIdController = async (req, res)=>{

    try{
    const recipeId = req.params.id;
    const uid = req.user.uid;
  

    const recipe = await recipeModel.findOne({_id: recipeId, firebaseUid: uid})
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found or unauthorized." });
    }

    return res.status(201).json({
        success: true,
        message: "recipe found",
        recipe:recipe
    })
}catch(error){
    return res.status(500).json({ message: `Failed to fetch recipe details. ${error}` });
}
}

const deleteRecipeByIdController = async(req, res)=>{
    try {
    const recipeId = req.params.id;
    const uid = req.user.uid;

    const deletedRecipe = await recipeModel.findOneAndDelete({ _id: recipeId, firebaseUid: uid });

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found or unauthorized." });
    }

    return res.status(200).json({ success: true, message: "Recipe deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete recipe." });
  }
}

const deleteAllRecipesController = async (req, res)=>{
    try {
    const uid = req.user.uid;

    const deletedRecipes = await recipeModel.deleteMany({ firebaseUid: uid });

    if (!deletedRecipes) {
      return res.status(404).json({ message: "Recipes not found or unauthorized." });
    }

    return res.status(200).json({ success: true, message: "All Recipes deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: `Failed to delete recipes.${error}` });
  }
}

const editRecipeController = async(req, res)=>{
      try{
          const {id} = req.params;
          const {title, imageUrl, ingredientsUsed, instructions, prepTime, difficulty} = req.body;
          const uid = req.user.uid;

          const updatedRecipe = await recipeModel.findOneAndUpdate({_id: id, firebaseUid: uid}, {title, ingredientsUsed, instructions, prepTime, difficulty, imageUrl}, {new: true});
          if(!updatedRecipe){
              return res.status(404).json({message: "Recipe not found or unauthorized."});
          }
          return res.status(200).json({success: true, message: "Recipe updated successfully.", recipe: updatedRecipe});
      }catch(error){
          return res.status(500).json({message: `Failed to update recipe. ${error}`});
      }
}

module.exports = {generateRecipeController, getUserRecipiesController, getRecipeByIdController, deleteRecipeByIdController, deleteAllRecipesController, editRecipeController}
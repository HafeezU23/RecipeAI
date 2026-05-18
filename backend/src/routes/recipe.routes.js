const express = require('express');
const verifyToken = require('../middlewares/auth.middleware')
const {generateRecipeController, getUserRecipiesController, deleteAllRecipesController, getRecipeByIdController, deleteRecipeByIdController, editRecipeController} = require('../controllers/recipe.controller')
const recipeRouter = express.Router()


recipeRouter.post('/generate', verifyToken, generateRecipeController)
recipeRouter.get('/history', verifyToken, getUserRecipiesController)
recipeRouter.get('/:id', verifyToken, getRecipeByIdController)
recipeRouter.delete('/delete-all', verifyToken, deleteAllRecipesController)
recipeRouter.delete('/:id', verifyToken, deleteRecipeByIdController)
recipeRouter.put('/edit/:id', verifyToken, editRecipeController)


module.exports = recipeRouter
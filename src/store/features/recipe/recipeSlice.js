import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes : [],
    currentRecipe: null,

}

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers:{
        setRecipes: (state, action)=>{
              state.recipes = action.payload;
        },
        addRecipe: (state,action)=>{
            state.recipes.unshift(action.payload)
        },
        setCurrentRecipe: (state,action)=>{
             state.currentRecipe = action.payload;
        },
        clearRecipes: (state)=>{
            state.recipes = []
            state.currentRecipe = null
        },
        deleteRecipe: (state, action)=>{
            state.recipes = state.recipes.filter((recipe)=>recipe._id !== action.payload)
        },
        updateRecipe: (state, action)=>{
            state.recipes = state.recipes.map((recipe)=>recipe._id === action.payload._id ? action.payload : recipe)
        }
    }
})

export const {setRecipes, setCurrentRecipe, addRecipe, clearRecipes,deleteRecipe,updateRecipe} = recipeSlice.actions

export default recipeSlice.reducer


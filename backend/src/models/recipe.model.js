const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    firebaseUid: {type: String, required: true},
    ingredients: {type:[String], required: true},
    title: { type: String, required: true },
    ingredientsUsed: { type: [String], required: true },
    instructions: { type: [String], required: true },
    prepTime: { type: String },
    difficulty: { type: String },
    imageUrl: {type: String}
},{timestamps: true})

const recipeModel = mongoose.model("recipe", recipeSchema);

module.exports = recipeModel;
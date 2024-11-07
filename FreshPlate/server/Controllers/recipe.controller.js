import Recipe from '../models/recipe.model.js';

const createRecipe = async (req, res) => {
  try {
    if (!req.user || !req.user.username) {
        return res.status(401).json({ error: 'User not authenticated or username not available' });
      }
    const recipe = new Recipe({
      ...req.body,
      creator: req.user.username  // Set the creator to the logged-in user's username
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ _id: req.params.id, creator: req.user.username });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found or you are not authorized to update it' });
    }
    Object.assign(recipe, req.body);
    await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({ _id: req.params.id, creator: req.user.username });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found or you are not authorized to delete it' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recipeByID = async (req, res, next, id) => {
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    req.recipe = recipe;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve recipe" });
  }
};

export default { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, recipeByID};
import Recipe from '../Models/recipe.model.js'
import errorHandler from '../controllers/error.controller.js'

const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      creator: req.auth.name  // Use the authenticated user's name
    })
    await recipe.save()
    return res.status(201).json(recipe)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const getAllRecipes = async (req, res) => {
  try {
    let recipes = await Recipe.find().select('title ingredients instructions creator preptime cooktime servings created updated')
    res.json(recipes)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const recipeByID = async (req, res, next, id) => {
  try {
    let recipe = await Recipe.findById(id)
    if (!recipe)
      return res.status(400).json({
        error: "Recipe not found"
      })
    req.recipe = recipe
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve recipe"
    })
  }
}

const updateRecipe = async (req, res) => {
  try {
    let recipe = req.recipe
    const updatableFields = ['title', 'ingredients', 'instructions', 'preptime', 'cooktime', 'servings']
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        recipe[field] = req.body[field]
      }
    })
    recipe.updated = Date.now()
    await recipe.save()
    res.json(recipe)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const deleteRecipe = async (req, res) => {
  try {
    let recipe = req.recipe
    let deletedRecipe = await Recipe.findByIdAndDelete(recipe._id)
    if (!deletedRecipe) {
      return res.status(404).json({
        error: "Recipe not found"
      })
    }
    res.json({ message: "Recipe deleted successfully", deletedRecipe })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const deleteAll = async (req, res) => {
  try {
    const result = await Recipe.deleteMany({ creator: req.auth.name })
    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "No recipes found for this user"
      })
    }
    res.json({ message: `${result.deletedCount} recipes deleted successfully` })
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const read = (req, res) => {
  return res.json(req.recipe)
}

const isCreator = (req, res, next) => {
  const authorized = req.recipe && req.auth && req.recipe.creator === req.auth.name
  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized"
    })
  }
  next()
}

export default { createRecipe, getAllRecipes, updateRecipe, deleteRecipe, deleteAll, recipeByID, isCreator, read};
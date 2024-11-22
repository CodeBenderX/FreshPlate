import Recipe from '../Models/recipe.model.js'
import errorHandler from '../Controllers/error.controller.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body)
    recipe.creator = req.auth.name 
    
    try {
    if (req.body.image) {
      const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      if (buffer.length > 5 * 1024 * 1024) {
        return res.status(400).json({
          error: "Image size should not exceed 5MB"
        });
      }
      const fileName = `${recipe._id}.jpg`;
      const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
  
      const filePath = path.join(uploadsDir, fileName);

        fs.writeFileSync(filePath, buffer);
        recipe.image = `/uploads/${fileName}`;
      } 

      await recipe.save()
      return res.status(200).json({
        message: "Successfully created recipe!",
        recipe: recipe
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

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
    if (deletedRecipe.image) {
      const imagePath = path.join(__dirname, '..', 'public', 'uploads', deletedRecipe.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        } else {
          console.log('Image file deleted successfully');
        }
      });
    }
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
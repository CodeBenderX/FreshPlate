import express from 'express'
import recipeCtrl from '../Controllers/recipe.controller.js'
import authCtrl from '../Controllers/auth.controller.js'

console.log('recipeCtrl:', recipeCtrl);  // Add this log
console.log('authCtrl:', authCtrl);  // Add this log

const router = express.Router()

router.route('/api/recipes')
  .post(authCtrl.requireSignin, authCtrl.setUser, recipeCtrl.createRecipe)
  .get(recipeCtrl.getAllRecipes)

router.route('/api/recipes/:recipeId')
  .get(recipeCtrl.getRecipeById)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, recipeCtrl.updateRecipe)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, recipeCtrl.deleteRecipe)

router.param('recipeId', recipeCtrl.recipeByID)

export default router
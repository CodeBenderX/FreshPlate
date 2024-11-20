import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  ingredients: {
    type: String,
    required: 'At least one ingredient is required'
  },
  instructions: {
    type: String,
    required: 'Instructions are required'
  },
  creator: {
    type: String,
    required: 'Creator is required'
  },
  preptime: {
    type: Number,
  },
  cooktime: {
    type: Number,
  },
  servings: {
    type: Number,
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

// Update the 'updated' field before saving
recipeSchema.pre('save', function(next) {
  this.updated = new Date();
  next();
});

export default mongoose.model('Recipe', recipeSchema);
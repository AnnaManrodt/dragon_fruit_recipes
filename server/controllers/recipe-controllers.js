// Requring in models
const Recipe = require("../models/Recipe");
const Review = require("../models/Review");
const User = require("../models/User");

// Exporting
module.exports = {
  // Get all recipes
  async getRecipes(req, res) {
    try {
      const recipe = await Recipe.find()
        .populate({ path: "reviews" });
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ msg: "Get recipes: " + err.message });
    };
  },

  // Get single recipe
  async getRecipe(req, res) {
    try {
      const recipe = await Recipe.findOne({ _id: req.params.recipeId })
        .populate({ path: "reviews" });
      if (!recipe) {
        return res.status(404).json({ msg: "No recipe found with that ID" });
      };
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ msg: "Get recipe: " + err.message });
    };
  },

  // Database create recipe
  async databaseRecipes(req, res) {
    try {
      const recipe = await Recipe.create(req.body);
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ msg: "Database create recipe: " + err.message });
    };
  },

  // Create recipe
  async createRecipe(req, res) {
    console.log(req.body)
    try {
      const recipe = await Recipe.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { createdRecipes: recipe._id } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ msg: 'No user with that ID' });
      };
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ msg: "Create recipe: " + err.message });
    };
  },

  // Create saved recipe
  async saveRecipe(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $addToSet: { savedRecipes: req.params.recipeId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ msg: 'No user with that ID' });
      };
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ msg: "Create saved recipe: " + err.message });
    };
  },

  // Update created recipe
  async updateCreatedRecipe(req, res) {
    try {
      const recipe = await Recipe.findOneAndUpdate(
        { _id: req.params.createdId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!recipe) {
        return res.status(404).json({ msg: "No recipe found with that ID" });
      };
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json({ msg: "Update created recipe: " + err.message });
    };
  },

  // Delete save recipe
  async deleteSavedRecipe(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { savedRecipes: req.params.savedId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ msg: "No recipe found with that ID" });
      };
      res.status(200).json({ msg: "recipe successfully deleted" })
    } catch (err) {
      res.status(500).json({ msg: "Delete saved recipe: " + err.message });
    };
  },

  // Delete created recipe
  async deleteCreatedRecipe(req, res) {
    console.log(req.params)
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { createdRecipes: req.params.createdId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ msg: "No recipe found with that ID" });
      };
      const recipe = await Recipe.findOneAndDelete(
        { _id: req.params.createdId },
        { $pull: { createdRecipes: req.params.createdId } },
        { runValidators: true, new: true }
      );
      if (!recipe) {
        return res.status(404).json({ msg: "No recipe found with that ID" });
      };
      await Review.deleteMany({ _id: { $in: recipe.reviews } });
      res.status(200).json({ msg: "recipe successfully deleted" })
    } catch (err) {
      res.status(500).json({ msg: "Delete created recipe: " + err.message });
    };
  },

  // Get category recipe
  async getByCategory(req, res){
    try {
      const recipe = await Recipe.find({ category: req.params.categoryId});
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }
      res.json({recipe: recipe, msg:"hello"});
    } catch (err) {
      res.status(500).send('Error finding recipe');
    }
  }
};
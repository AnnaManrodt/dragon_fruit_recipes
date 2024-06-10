// Requiring in express and controllers
const router = require("express").Router();
const {
  getRecipe,
  getRecipes,
  saveRecipe,
  databaseRecipes,
  getByCategory
} = require("../../controllers/recipe-controllers");
const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../../controllers/review-controllers");

// All route
router
  .route("/")
  .get(getRecipes)
  .post(databaseRecipes);

  // Category route
router
  .route("/category/:categoryId")
  .get(getByCategory);

// Single route
router
  .route("/:recipeId")
  .get(getRecipe)
  .post(saveRecipe)
  
// All reviews for recipe route
router
  .route("/:recipeId/reviews")
  .get(getReviews)
  .post(createReview);

// Single review for recipe route
router
  .route("/:recipeId/reviews/:reviewId")
  .get(getReview)
  .put(updateReview)
  .delete(deleteReview);

// Invalid route
router.use((req, res) => res.send("Invalid Route"));

// Exporting
module.exports = router;
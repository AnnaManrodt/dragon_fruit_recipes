// Requiring in express and controllers
const router = require("express").Router();
const {
  getUser,
  getUsers,
  getSave,
  getSaves,
  getCreate,
  getCreates,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  verifyUser,
  deleteAll
} = require("../../controllers/user-controllers");
const {
  createRecipe,
  updateCreatedRecipe,
  deleteSavedRecipe,
  deleteCreatedRecipe
} = require("../../controllers/recipe-controllers");

// All user route
router
  .route("/")
  .get(getUsers)
  .post(createUser);

// Login user route
router
  .route("/login")
  .post(loginUser);

// Verify user route
router
  .route("/verify")
  .get(verifyUser);

// DELETE ALL
router
  .route("/deleteall")
  .delete(deleteAll);
  
// Single user Route
router
  .route("/:userId")
  .get(getUser)
  .post(createRecipe)
  .put(updateUser)
  .delete(deleteUser);

// All saved route
router
  .route("/:userId/saved")
  .get(getSaves)
  
// All created route
router
  .route("/:userId/created")
  .get(getCreates);

// Single saved route
router
  .route("/:userId/saved/:savedId")
  .get(getSave)
  .delete(deleteSavedRecipe);

// Single created route
router
  .route("/:userId/created/:createdId")
  .get(getCreate)
  .put(updateCreatedRecipe)
  .delete(deleteCreatedRecipe);

// Invalid route
router.use((req, res) => res.send("Invalid Route"));

// Exporting
module.exports = router;

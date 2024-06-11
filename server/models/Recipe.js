// Requring in mongoose
const {Schema, model} = require('mongoose');

// ecipe model template
const recipeSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
		},
		category: {
			type: String,
			required: true,
			enum: ["Beef","Breakfast","Chicken","Dessert","Goat","Lamb","Miscellaneous","Pasta","Pork","Seafood","Side","Starter","Vegan", "Vegetarian"]
		},
		instructions: {
			type: String,
			required: true
		},
		ingredients: {
			type: [String],
			required: true
		},
		measurements: {
			type: [String],
			required: true
		},
		picture: {
			type: String,
		},
		reviews: [{
      type: Schema.Types.ObjectId,
      ref: "review",
    }],
	},
	{
		id: false,
		versionKey: false
	}
);

// Creation of model from schema
const Recipe = new model("recipe", recipeSchema);

// Exporting model
module.exports = Recipe;


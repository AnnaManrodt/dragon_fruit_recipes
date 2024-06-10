import React, { useState } from "react";
import ViewRecipes from "../componets/ViewRecipes"
import { NavLink } from "react-router-dom";
import '../style/createRecipe.css'

export default function RecipeSearch() {

    const [formData, setFormData] = useState({
        title: '',
        category: '',
    });
    const [recipe, setRecipe] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e, fieldName) => {
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.category !== "-- Select an option --"){
            fetch(`/api/recipes/category/${formData.category}`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data)
            })
            .catch(error => {
                setErrorMessage("Failed to load recipes");
                console.error('Error:', error);
            });
        } else {
            fetch(`/api/recipes/`)
            .then(response => response.json())
            .then(data => {
                setRecipe(data)
            })
            .catch(error => {
                setErrorMessage("Failed to load recipes");
                console.error('Error:', error);
            });
        }
    };
        
    return (
        <>
            <h3>Featured Recipes</h3>
            <form onSubmit={handleSubmit}  className="border p-3 form">
                <label htmlFor="dropdown-basic-button">Search by Category: </label>
                <select id="dropdown-basic-button" title="Select Category" onChange={(e) => handleChange(e, 'category')} value={formData.category}>
                    <option value="-- Select an option --">-- Select an option --</option>
                    <option value="Beef">Beef</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Chicken">Chicken</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Goat">Goat</option>
                    <option value="Lamb">Lamb</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Pork">Pork</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Side">Side</option>
                    <option value="Starter">Starter</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                </select >
                <button type="submit" variant="primary">Submit</button>
            </form>
            <div>
            <div className="bodyWidth">
                {recipe.recipe ? (
                    recipe.recipe.map((rec, i) => (
                        <NavLink to={`/recipes/${rec._id}`} key={i}>
                            <div className="allRecipeCard" key={`${i}`}>
                                <h2>{rec.title}</h2>
                                <h3>{rec.category}</h3>
                                <img src={rec.picture} alt="random recipe" className="recipeImageReSize" />
                            </div>
                        </NavLink>
                    ))
                ) : (
                    <ViewRecipes />
                )}
                {errorMessage && <p>{errorMessage}</p>}
                </div>
            </div>
        </>
    )
};
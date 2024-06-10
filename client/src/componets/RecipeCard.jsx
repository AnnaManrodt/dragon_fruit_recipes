import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function RecipeCard() {
    const [recipe, setRecipe] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    function getRandomNumber(array){
        return Math.floor(Math.random() * (array.length))
    }

    useEffect(() => {
        fetch("/api/recipes")
            .then(response => response.json())
            .then(data => setRecipe(data[`${getRandomNumber(data)}`]))
            .catch(error => {
                setErrorMessage("Failed to fetch random recipe");
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className="randomRecipeCard">
            {recipe ? (
                <NavLink to={`/recipes/${recipe._id}`}> 
                <h2>{recipe.title}</h2>
                <img src={recipe.picture} alt="random recipe" className="recipeImageReSize"/>
                </NavLink>
            ) : (
                <p>Loading...</p>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
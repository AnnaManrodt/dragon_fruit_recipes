import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function ViewRecipes() {
  const [recipe, setRecipe] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch("/api/recipes")
      .then(response => response.json())
      .then(data => {
        setRecipe(data)
      })
      .catch(error => {
        setErrorMessage("Failed to load recipes");
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="bodyWidth">
      {recipe.length > 0 ? (
        recipe.map((rec, i) => (
          <NavLink to={`/recipes/${rec._id}`} key={i}>
            <div className="allRecipeCard">
              <h2>{rec.title}</h2>
              <h3>{rec.category}</h3>
              <img src={rec.picture} alt="random recipe" className="recipeImageReSize" />
            </div>
            
          </NavLink>
        ))
      ) : (
        <p>Loading...</p>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
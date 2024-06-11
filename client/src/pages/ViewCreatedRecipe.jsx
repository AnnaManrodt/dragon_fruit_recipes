import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserNav from '../componets/UserPageNav'
import { useAppContext } from "../providers/AppProvider";
import axios from "axios";
import "../style/viewsaved.css";


export default function ViewCreatedRecipe() {

  const { currentUser } = useAppContext()
  const [recipe, setRecipe] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [forceUpdate, setForceUpdate] = useState(false);

  async function getRecipe() {
    try {
      const response = await axios(`/api/users/${currentUser._id}/created`);
      setRecipe(response.data.createdRecipes);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteCreate = (i) => {
    fetch(`/api/users/${currentUser._id}/created/${i}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setForceUpdate(prevState => !prevState);
        } else {
          console.log('Error deleting user');
        }
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  useEffect(() => {
    if (currentUser) {
      getRecipe();
    }
  }, [currentUser, forceUpdate]);

  if (!currentUser) return <></>
  return (
    <>
      <UserNav />
      <h3>Created Recipes</h3>
      <div className="recipe-card-container">
        <div>
          <div>
            <div className="bodyWidth">
              {recipe.length > 0 ? (
                recipe?.map((rec, i) => (
                  <div className="allRecipeCard" key={i}>
                    <NavLink to={`/recipes/${rec._id}`}>
                      <h2 id="unCreateH2">{rec.title}</h2>
                      <img src={rec.picture} alt="random recipe" className="recipeImageReSize unCreateImg" />
                    </NavLink>
                    <div className="unCreate">
                      <h3>{rec.category}</h3>
                      <button className="unCreateBtn" onClick={() => handleDeleteCreate(rec._id)}>Delete Recipe</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
              {errorMessage && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
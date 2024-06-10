import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import UserNav from '../componets/UserPageNav'
import '../style/viewsaved.css'
import { useAppContext } from "../providers/AppProvider";
import axios from "axios";


export default function ViewSavedRecipe() {

    const {currentUser} = useAppContext()
    const [recipe, setRecipe] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

        // async function getRecipe(){
        //     currentUser?.savedRecipes.forEach(recipe => {
        //         axios(`/api/recipes/${recipe}`)
        //         .then(data => {
        //             setRecipe(data.data)
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        //     })
        // }
        // getRecipe()

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
        <>
            <UserNav />
            <h3>Saved Recipes</h3>
            <div className="recipe-card-container">
                <div>
                    <div>
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
                    </div>
                </div>
            </div>
        </>
    )

}
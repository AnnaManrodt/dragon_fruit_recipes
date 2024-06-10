import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import { useAppContext } from "../providers/AppProvider";
import "../style/searchPage.css"

export default function SingleRecipe(){

    const {currentUser} = useAppContext();
    const params = useParams();
    const [recipe, setRecipe] = useState();
    const [submitMessage, setSubmitMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    function lookUpRecipe() {
        fetch(`/api/recipes/${params.recipeId}`)
        .then(response => response.json())
        .then(data => {
            setRecipe(data)
        })
        .catch(error => {
            setErrorMessage("Failed to load recipes");
            console.error('Error:', error);
        });
    }

    function saveRecipeToUser() {
        fetch(`/api/recipes/${params.recipeId}`, {
            method: "POST",
            body: JSON.stringify({_id: currentUser._id}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.msg){
                setErrorMessage("Failed to save recipe");
            } else {
                setSubmitMessage("Recipe saved to your profile");
            }
        })
        .catch(error => {
            setErrorMessage("Failed to save recipe");
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        if(params){
            lookUpRecipe()
        }
    }, [params])

    if(!recipe) return <></>
    return(
        <div className="singleRecipePage">
            <h1>{recipe.title}</h1>
            <div className="h3Save">
                <h3>Category: {recipe.category}</h3>
                {(currentUser === undefined || currentUser === null) ? (
                    <></>
                    ) : (
                        <button className="saveButton" onClick={saveRecipeToUser}>Save Recipe</button>
                )}
            </div>
            <div>{errorMessage}{submitMessage}</div>
            <img className="singleImageSrc" src={recipe.picture} alt={recipe.title} />
            <h3 className="singleInstructions"><span>Instructions:</span> {recipe.instructions}</h3>
            <div className="ingMeasBox">
                {recipe.ingredients.map((ingredient, index) => (
                    <h3 className="ingMeas" key={index}>{ingredient} {recipe.measurements[index]}</h3>
                ))}
            </div>
            {recipe.reviews.map((review, index) => (
                <div key={index}>
                    <h3>Rating: {review.rating}</h3>
                    <h3>Comments: {review.comments}</h3>
                </div>
            ))}
        </div>
    )
}
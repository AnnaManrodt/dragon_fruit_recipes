import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppContext } from "../providers/AppProvider";
import "../style/searchPage.css"

export default function SingleRecipe() {

    const { currentUser } = useAppContext();
    const params = useParams();
    const [recipe, setRecipe] = useState();
    const [submitMessage, setSubmitMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageReview, setErrorMessageReview] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [formData, setFormData] = useState({
        rating: "",
        comments : ""
    })

    const toggleForm = () => {
        if(currentUser) {
            setShowForm(!showForm);
        } else {
            setErrorMessageReview("You must be logged in to leave a review")
        }
    };

    useEffect(() => {
        if (params) {
            lookUpRecipe()
        }
    }, [params, forceUpdate])

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

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    function clearForms() {
        setFormData({  rating: "", comments : "" })
    }

    const postReview = async (event) => {
        event.preventDefault(); // Prevents the default form submission behavior
        try {
            const response = await fetch(`/api/recipes/${params.recipeId}/reviews`, {
                method: 'POST', // Specifies that this is a POST request
                body: JSON.stringify({ // Converts the data to JSON format for the request body
                    rating: formData.rating,
                    comments: formData.comments, // Adds the comments from the form data to the request body
                    email: currentUser.email
                }),
                headers: {
                    'Content-Type': 'application/json' // Specifies that the content type is JSON
                }
            });
            if (response.ok) { // Checks if the response status is in the range 200-299
                setForceUpdate(prevState => !prevState);
                clearForms()
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const responseData = await response.json(); // Parses the response data as JSON
                    console.log('Response from server:', responseData); // Logs the response data to the console
                } else {
                    const textData = await response.text(); // Get the response as text
                    console.error('Non-JSON response:', textData); // Log the non-JSON response
                }
            } else {
                console.error('Failed to submit form data'); // Logs an error message if the response is not ok
            }
        } catch (error) {
            console.error('An error occurred while submitting form data:', error); // Logs any errors that occur during the request
        }
    };

    function saveRecipeToUser() {
        fetch(`/api/recipes/${params.recipeId}`, {
            method: 'POST',
            body: JSON.stringify({ _id: currentUser._id }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg) {
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

    if (!recipe) return <></>
    return (
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
            <div>
                {recipe.reviews.map((review, index) => (
                    <div key={index}>
                        <h3>Rating: {review.rating}</h3>
                        <h3>Comments: {review.comments}</h3>
                    </div>
                ))}
                <button onClick={toggleForm} className="reviewBtn">Leave a Review!</button>
                {errorMessageReview}
                {showForm && (
                    <form className="reviewForm">
                        <label>Rating</label>
                        <input type="number" min={1} max={5} name="rating" value={formData.rating} onChange={handleInputChange} required/>
                        <label>Comment</label>
                        <textarea type="text" name="comments" value={formData.comments} onChange={handleInputChange} required/>
                        <button onClick={postReview}>Save Review</button>
                    </form>
                )}
            </div>
        </div>
    )
}
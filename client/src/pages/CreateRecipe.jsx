import { useState } from "react"
import { useAppContext } from "../providers/AppProvider";
import '../style/createRecipe.css'

export default function CreateRecipe() {

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const { currentUser } = useAppContext()
    const [inputIngredient, setInputIngredient] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        instructions: '',
        ingredients: [],
        measurements: [],
        picture: ''
    });

    const handleChange = (e, fieldName) => {
            setFormData({
                ...formData,
                [fieldName]: e.target.value,
            });
    };

    const handleIngredientChange = (e, fieldName, index) => {
        setFormData({
            ...formData});
        formData[fieldName][index] = e.target.value;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/users/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const result = await response.json();
                // Handle successful form submission
                setMessage("Recipe created successfully!");
                //console.log("Result is", result);
                console.log('Form data submitted successfully');
                window.location.href = "/user/created";
                //history.push('/my-new-page');
            } else {
                const result = await response.json();
                // Handle errors if submission fails
                setErrorMessage("Failed to create recipe: " + result.msg);
                console.error('Form data submission failed');
            }
        } catch (error) {
            setErrorMessage("Failed to create recipe: " + error);
            console.error('An error occurred while submitting form data:', error);
        }
    };

    const addFields = (event) => {
         event.preventDefault();
         formData.ingredients.push('');
         formData.measurements.push('');
            setFormData({
                ...formData});
    }


    return (
        <>
            <h2>Create a Recipe!</h2>
            <div className="outer">
                <form onSubmit={handleSubmit} className="formParent">
                    <div className="firstThreeFields">
                        <div className="top-row">
                            <label htmlFor="title">Recipe Title: </label>
                            <br/>
                            <input required type="text" placeholder="Please type Dish title" value={formData.title} onChange={(e) => handleChange(e, 'title')} />
                        </div>
                        <div className="top-row">
                            <label htmlFor="dropdown-basic-button">Category: </label>
                            <br/>
                            <select required id="dropdown-basic-button" title="Select Category" value={formData.category} onChange={(e) => handleChange(e, 'category')} >
                                <option value=""></option>
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
                        </div>
                        <div className="top-row">
                            <label htmlFor="instructions">Instructions: </label>
                            <br/>
                            <textarea required type="text" id="instructions" rows="15" placeholder="Please enter Instructions" value={formData.instructions} onChange={(e) => handleChange(e, 'instructions')}  />
                        </div>
                    </div>
                    <div className="ingredientList">
                        {formData.ingredients.map((ingredient, index) => (
                        <div className="rowStyling" key={index}>
                            <label htmlFor="ingredients">Ingredient: </label>
                            <input type="text" className="amFormInput" placeholder="Add Ingredient" value={ingredient.name} onChange={(e) => handleIngredientChange(e, 'ingredients', index)}  />

                            <label htmlFor="measurements">Measurement: </label>
                            <input type="text" className="amFormInput" placeholder="Add Measurement" value={ingredient.measurement} onChange={(e) => handleIngredientChange(e, 'measurements', index)}/>
                        </div>))}
                    </div>
                    <button onClick={addFields} className="addIngredientButton">Add Another Ingredient</button>
                    <br/>
                    <button type="submit" value="Submit">Submit Recipe</button>
                </form>
            </div>
            <div className="errorMessageLogin info">
                {message && (<p>{message}</p>)}
            </div>
            <div className="errorMessageLogin danger">
                {errorMessage && (<p>{errorMessage}</p>)}
            </div>
        </>
    )
}
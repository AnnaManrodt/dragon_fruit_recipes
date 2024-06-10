import { useState, useEffect, useLocation } from "react"
import { useAppContext } from "../providers/AppProvider";
import AddFormFields from "../componets/AddFormFields";
import '../style/createRecipe.css'

export default function CreateRecipe() {

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
                // Handle successful form submission
                console.log(response)
                console.log('Form data submitted successfully');
            } else {
                // Handle errors if submission fails
                console.error('Form data submission failed');
            }
        } catch (error) {
            console.error('An error occurred while submitting form data:', error);
        }
    };

    const addFields = (event) => {
        event.preventDefault();
        setInputIngredient([...inputIngredient, <AddFormFields key={inputIngredient.length} />]);
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
                            <input type="text" placeholder="Please type Dish title" value={formData.title} onChange={(e) => handleChange(e, 'title')} />
                        </div>
                        <div className="top-row">
                            <label htmlFor="dropdown-basic-button">Category: </label>
                            <br/>
                            <select id="dropdown-basic-button" title="Select Category" value={formData.category} onChange={(e) => handleChange(e, 'category')} >
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
                            <textarea type="text" id="instructions" placeholder="Please enter Instructions" value={formData.instructions} onChange={(e) => handleChange(e, 'instructions')}  />
                        </div>
                    </div>
                    <div className="ingredientList">
                        <div className="rowStyling">
                            {inputIngredient}
                        </div>
                    </div>
                    <button onClick={addFields} className="addIngredientButton">Add Another Ingredient</button>
                    <br/>
                    <button type="submit" value="Submit">Submit Recipe</button>
                </form>
            </div>
        </>
    )
}
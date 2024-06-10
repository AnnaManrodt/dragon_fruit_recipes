import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/home.css"
import RecipeCard from "../componets/RecipeCard";

export default function HomePage() {

    const navigate = useNavigate();
    useEffect(() => {
        // Call navigate() inside the useEffect hook
        navigate('/');
    }, []);

    return (
        <>
            <div className='about'>
                <p> Welcome to DragonFruit Delights! This is a page for finding new recipes and sharing your own. Log in or sign up to contribute to our cooking community! </p>
            </div>
            <div className="recipe-card-container">
                <div className='recipe-card'>
                    <RecipeCard />
                </div>
                <div className='recipe-card'>
                    <RecipeCard />
                </div>
                <div className='recipe-card'>
                    <RecipeCard />
                </div>
            </div>
        </>
    )
}

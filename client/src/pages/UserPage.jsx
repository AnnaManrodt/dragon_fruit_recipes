import React from "react";
import RecipeCard from "../componets/RecipeCard";
import UserNav from '../componets/UserPageNav'

export default function UserPage() {

    return(
        <>
            <UserNav/>
            <div className="recipe-card-container">
                <div className="recipe-card">
                    <RecipeCard/>
                </div>
                <div className="recipe-card">
                    <RecipeCard/>
                </div>
            </div>
        </>
    )

}
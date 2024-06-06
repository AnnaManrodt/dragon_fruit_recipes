import React, { useState, useEffect, useLocation } from "react";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import '../style/createRecipe.css'

export default function RecipeSearch() {

    const navigate = useNavigate();
    useEffect(() => {
        // Call navigate() inside the useEffect hook
        navigate('/search');
    }, []);

    const search = searchResult();
    useEffect(() => {
        const fetchOneResult = async () => {
            try {
                const response = await fetch({
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const responseData = await response.json();
                    setData(responseData);
                } else {
                    console.error('Failed to fetch data');
                }
                } catch(error) {
                    console.error('An error occured while fetching data:', error);
                }
            }
        })
        return (
            <>
            <h3>Featured Recipes</h3>
            {/* add recipe card */}
                <Form className="border p-3 form">
                    <FormGroup className="mb-3">
                        <FormLabel>Search by Title: </FormLabel>
                        <FormControl type="text" placeholder="Search by title" />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormLabel>Search by Category: </FormLabel>
                        <select id="dropdown-basic-button" title="Select Category">
                            <option value="beef">Beef</option>
                            <option value="volvo">Chicken</option>
                            <option value="volvo">Dessert</option>
                            <option value="volvo">Lamb</option>
                            <option value="volvo">Miscellaneous</option>
                            <option value="volvo">Pork</option>
                            <option value="volvo">Seafood</option>
                            <option value="volvo">Side</option>
                            <option value="volvo">Starter</option>
                            <option value="volvo">Vegan</option>
                            <option value="volvo">Vegetarian</option>
                            <option value="volvo">Breakfast</option>
                            <option value="volvo">Goat</option>
                        </select >
                    </FormGroup>
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </>
        )
    };





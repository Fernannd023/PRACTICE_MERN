import React, { useState } from 'react'
import './addrecipe.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';

export default function AddRecipe() {
    const recipes = {
        title: "",
        ingredients: "",
        instructions: ""
    };

    const [recipe, setRecipe] = useState(recipes);

    const navigate = useNavigate();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/recipe", recipe).then((response) => {
            toast.success(response.data.message,{position:"top-right"});
            navigate("/");
        })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="addRecipe">
            <Link to="/" type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i></Link>
            <h3>Add New Recipe</h3>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="titleRecipe">Title:</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="titleRecipe" name="title" placeholder="Enter title" />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredientsRecipe">Ingredients:</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="ingredientsRecipe" name="ingredients" placeholder="Enter ingredients" />
                </div>
                <div className="form-group">
                    <label htmlFor="instructionsRecipe">Instructions:</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="instructionsRecipe" name="instructions" placeholder="Enter instructions" />
                </div>
                <button type="submit" className="btn btn-primary submit">Submit</button>
            </form>

        </div>
    )
}
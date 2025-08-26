import React, { useState } from 'react'
import './addrecipe.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';

export default function AddRecipe() {
    const recipes = {
        recipeName: "",
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
    try {
      const response = await axios.post("http://localhost:8000/api/recipe", recipe);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/"); // vuelve al listado de recetas
    } catch (error) {
      console.log(error);
      toast.error("Error creando la receta", { position: "top-right" });
    }
  };

    return (
        <div className="addRecipe">
            <Link to="/" type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i></Link>
            <h3>Add New Recipe</h3>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="recipeName">Recipe Name:</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="recipeName" name="recipeName" placeholder="Enter recipe name" value={recipe.recipeName} />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="ingredients" name="ingredients" placeholder="Enter ingredients" value={recipe.ingredients} required />
                </div>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions:</label>
                    <input onChange={inputHandler} type="text" className="form-control" id="instructions" name="instructions" placeholder="Enter instructions" value={recipe.instructions} required />
                </div>
                <button type="submit" className="btn btn-primary submit">Submit</button>
            </form>

        </div>
    )
}
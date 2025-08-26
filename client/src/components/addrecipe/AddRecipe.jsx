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
  <div className="form-group mb-3">
    <label htmlFor="recipeName">Recipe Name</label>
    <input
      onChange={inputHandler}
      type="text"
      className="form-control"
      id="recipeName"
      name="recipeName"
      placeholder="Enter recipe name"
      value={recipe.recipeName}
      required
    />
  </div>

  <div className="form-group mb-3">
    <label htmlFor="ingredients">Ingredients</label>
    <input
      onChange={inputHandler}
      type="text"
      className="form-control"
      id="ingredients"
      name="ingredients"
      placeholder="Enter ingredients (comma separated)"
      value={recipe.ingredients}
      required
    />
  </div>

  <div className="form-group mb-3">
    <label htmlFor="instructions">Instructions</label>
    <textarea
      onChange={inputHandler}
      className="form-control"
      id="instructions"
      name="instructions"
      placeholder="Write step by step..."
      value={recipe.instructions}
      rows="4"
      required
    ></textarea>
  </div>

  <button type="submit" className="btn btn-primary">
    Save Recipe
  </button>
</form>
        </div>
    )
}
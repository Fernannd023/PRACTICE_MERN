import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast';
import './updaterecipe.css'

export default function UpdateRecipe() {
  const recipes = {
    recipeName: "",
    ingredients: "",
    instructions: ""
  };

  const [recipe, setRecipe] = useState(recipes);

  const navigate = useNavigate();

  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  }

  useEffect(() => {
    axios.get(`http://localhost:8000/api/recipe/${id}`)
      .then((response) => {
        setRecipe(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [id])

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/recipe/${id}`, recipe).then((response) => {
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="updateRecipe">
      <Link to="/" type="button" className="btn btn-secondary"><i className="fa-solid fa-backward"></i></Link>
      <h3>Update Recipe</h3>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="recipeName">Recipe Name:</label>
          <input value={recipe.recipeName} onChange={inputHandler} type="text" className="form-control" id="recipeName" name="recipeName" placeholder="Enter recipe name" />
        </div>
        <div className="form-group">
          <label htmlFor="ingredientsRecipe">Ingredients:</label>
          <input value={recipe.ingredients} onChange={inputHandler} type="text" className="form-control" id="ingredientsRecipe" name="ingredients" placeholder="Enter ingredients" />
        </div>
        <div className="form-group">
          <label htmlFor="instructionsRecipe">Instructions:</label>
          <input value={recipe.instructions} onChange={inputHandler} type="text" className="form-control" id="instructionsRecipe" name="instructions" placeholder="Enter instructions" />
        </div>
        <button type="submit" className="btn btn-primary submit">Submit</button>
      </form>

    </div>
  )
}
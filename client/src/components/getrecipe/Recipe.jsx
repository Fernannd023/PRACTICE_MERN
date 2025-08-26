import React, { useEffect, useState } from 'react'
import './recipe.css'
import axios from "axios"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';


export default function Recipe() {
    const [recipes, setRecipes] = useState([])
    useEffect(() => {
        const fetchData = async (params) => {
            try {
                const response = await axios.get("http://localhost:8000/api/recipes");
                setRecipes(response.data);
            } catch (error) {
                console.log("Error while fetching data ", error);
            }
        };
        fetchData();
    }, []);


    const deleteRecipe = async (recipeId) => {
        await axios.delete(`http://localhost:8000/api/delete/recipe/${recipeId}`)
            .then((response) => {
                setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
                toast.success(response.data.message, { position: "top-right" });
            })
            .catch((error) => {
                console.log(error);
            })
    };

     return (
        <div className="recipeTable">
            <Link to="/add" type="button" className="btn btn-primary">Add Recipe <i className="fa-solid fa-recipe-plus"></i></Link>
            {recipes.length === 0 ? (
                <div className="noData">
                    <h3>No Data to display</h3>
                    <p>Please add new recipe</p>
                </div>
            ) : (<table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Recipe Name</th>
                        <th scope="col">Ingredients</th>
                        <th scope="col">Instructions</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe, index) => {
                        return (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{recipe.recipeName}</td>
                                <td>{recipe.ingredients}</td>
                                <td>{recipe.instructions}</td>
                                <td className="actionsButtons">
                                    <Link to={`/update/${recipe._id}`} type="button" className="btn btn-info">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        onClick={() => deleteRecipe(recipe._id)}
                                        type="button" className="btn btn-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>)}
        </div>
    )
}



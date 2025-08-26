import express from "express";
import { getAllRecipes, create, getRecipeById, updateRecipe, deleteRecipe } from "../controller/recipeController.js";

// Crear router
const route = express.Router();

route.post("/recipe", create);
route.get("/recipes", getAllRecipes);
route.get("/recipe/:id", getRecipeById);
route.put("/update/recipe/:id", updateRecipe);
route.delete("/delete/recipe/:id", deleteRecipe);


export default route;
import mongoose from "mongoose"

const recipeSchema = new mongoose.Schema(
    {
        recipeName: {
            type: String,
            required: true
        },
        ingredients: {
            type: String,
            required: true
        },
        instructions:{
            type: String,
            required: true
        }
    }
)

export default mongoose.model("Recipes",recipeSchema)
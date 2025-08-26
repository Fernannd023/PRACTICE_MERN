import Recipe from "../model/recipeModel.js"

export const create = async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const { ingredients } = newRecipe;
        const recipeExist = await Recipe.findOne({ ingredients });
        if (recipeExist) {
            return res.status(400).json({
                message: "Recipe already exist"
            })
        }

        const savedData = await newRecipe.save();
        //res.status(200).json(savedData);
        res.status(200).json({message:"Recipe created successfully."});
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}


export const getAllRecipes = async (req, res) => {
    try {
        const recipeData = await Recipe.find();
        if (!recipeData || recipeData.length === 0) {
            return res.status(404).json({ message: "Recipe data not found." })
        }
        return res.status(200).json(recipeData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const getRecipeById = async (req, res) => {
    try {
        const id = req.params.id;
        const recipeExist = await Recipe.findById(id);

        if (!recipeExist) {
            return res.status(404).json({ message: "Recipe not found." })
        }
        return res.status(200).json(recipeExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const updateRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const recipeExist = await Recipe.findById(id);

        if (!recipeExist) {
            return res.status(404).json({ message: "Recipe not found." })
        }
        const updateData = await Recipe.findByIdAndUpdate(id, req.body, {
            new: true
        });
        res.status(200).json({message:"Recipe updated successfully."});

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

export const deleteRecipe = async (req, res) => {
    try {
        const id = req.params.id;
        const recipeExist = await Recipe.findById(id);
        if (!recipeExist) {
            return res.status(404).json({ message: "Recipe not found." })
        }
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ message: "Recipe deleted successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const selectedRecipe = storedRecipes.find((r) => r.id.toString() === id);
        setRecipe(selectedRecipe);
    }, [id]);

    if (!recipe) return <h2>Recipe not found!</h2>;

    return (
        <div className="recipe-detail">
            <h1>{recipe.title}</h1>
            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
        </div>
    );
};

export default RecipeDetail;

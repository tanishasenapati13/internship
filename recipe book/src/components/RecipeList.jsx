import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    // Fetch recipes from local storage
    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
        setRecipes(storedRecipes);
    }, []);

    // Function to handle recipe deletion
    const deleteRecipe = (id) => {
        // Ask for confirmation
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        
        if (confirmDelete) {
            // Filter out the deleted recipe from the state and localStorage
            const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
            setRecipes(updatedRecipes);  // Update state
            localStorage.setItem("recipes", JSON.stringify(updatedRecipes));  // Update localStorage
        }
    };

    return (
        <div className="recipe-list">
            <h1>All Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes available.</p>
            ) : (
                <div className="recipe-grid">
                    {recipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-card">
                            <h3>{recipe.title}</h3>
                            <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                            <Link to={`/recipe/${recipe.id}`} className="view-btn">View Details</Link>
                            <button onClick={() => deleteRecipe(recipe.id)} className="delete-btn">❌ Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecipeList;

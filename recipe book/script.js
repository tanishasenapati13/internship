document.addEventListener("DOMContentLoaded", () => {
    const recipeForm = document.getElementById("recipeForm");
    const recipeContainer = document.getElementById("recipeContainer");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const imageUpload = document.getElementById("imageUpload");
    const imagePreview = document.getElementById("imagePreview");
    const searchInput = document.getElementById("searchInput");

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    renderRecipes(recipes);

    if (imageUpload) {
        imageUpload.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    imagePreview.src = reader.result;
                    imagePreview.style.display = "block";
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (recipeForm) {
        recipeForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("recipeName").value.trim();
            const ingredients = document.getElementById("ingredients").value.trim();
            const steps = document.getElementById("steps").value.trim();
            const image = imagePreview.src;

            if (!name || !ingredients || !steps || !image) {
                alert("Please fill all fields and upload an image!");
                return;
            }

            const newRecipe = { id: Date.now(), name, ingredients, steps, image };
            recipes.push(newRecipe);
            localStorage.setItem("recipes", JSON.stringify(recipes));

            renderRecipes(recipes);
            recipeForm.reset();
            imagePreview.style.display = "none";
        });
    }

    function renderRecipes(recipeList) {
        recipeContainer.innerHTML = "";
        if (recipeList.length === 0) {
            recipeContainer.innerHTML = "<p>No recipes found!</p>";
            return;
        }

        recipeList.forEach((recipe) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}">
                <h3>${recipe.name}</h3>
            `;
            recipeCard.addEventListener("click", () => {
                localStorage.setItem("selectedRecipe", JSON.stringify(recipe));
                window.location.href = "recipe.html";
            });
            recipeContainer.appendChild(recipeCard);
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const filteredRecipes = recipes.filter(recipe => 
                recipe.name.toLowerCase().includes(query)
            );
            renderRecipes(filteredRecipes);
        });
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }
});

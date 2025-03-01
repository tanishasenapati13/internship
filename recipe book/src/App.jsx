import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";
import AddRecipe from "./AddRecipe";

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/recipes">All Recipes</Link>
            </nav>
            <Routes>
                <Route path="/" element={<AddRecipe />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
};

export default App;

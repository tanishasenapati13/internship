import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("You must be logged in to add a recipe!");
      return;
    }

    await addDoc(collection(db, "recipes"), {
      title,
      description,
      ingredients,
      steps,
      userId: auth.currentUser.uid,
      author: auth.currentUser.displayName,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Recipe</h2>
      {auth.currentUser ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe Title" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short Description" required />
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingredients" required />
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Preparation Steps" required />
          <button type="submit">Submit Recipe</button>
        </>
      ) : (
        <p>Please log in to add a recipe.</p>
      )}
    </form>
  );
};

export default RecipeForm;

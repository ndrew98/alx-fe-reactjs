import React, { useState } from "react";
import useRecipeStore from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addRecipe({ id: Date.now(), title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;

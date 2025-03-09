import React from "react";
import useRecipeStore from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = ({ recipeId }) => {
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  const isFavorite = favorites.includes(recipeId);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  if (!recipe) {
    return <div className="alert alert-danger">Recipe not found</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">{recipe.title}</h1>
        <p className="card-text">{recipe.description}</p>
        <button
          className={`btn ${isFavorite ? "btn-danger" : "btn-primary"} me-2`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton recipeId={recipe.id} />
      </div>
    </div>
  );
};

export default RecipeDetails;

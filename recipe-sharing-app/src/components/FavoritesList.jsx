import React from "react";
import useRecipeStore from "./recipeStore";

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) =>
      state.recipes.find((recipe) => recipe.id === id)
    )
  );

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
          <div key={recipe.id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{recipe.title}</h3>
              <p className="card-text">{recipe.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">
          No favorites yet. Add some recipes to your favorites!
        </p>
      )}
    </div>
  );
};

export default FavoritesList;

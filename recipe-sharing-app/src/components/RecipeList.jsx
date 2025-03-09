import React from "react";
import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">
              <Link
                to={`/recipe/${recipe.id}`}
                className="text-decoration-none"
              >
                {recipe.title}
              </Link>
            </h3>
            <p className="card-text">{recipe.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;

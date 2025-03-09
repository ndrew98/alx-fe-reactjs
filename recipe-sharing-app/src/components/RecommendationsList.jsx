import React from "react";
import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.length > 0 ? (
        recommendations.map((recipe) => (
          <div key={recipe.id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{recipe.title}</h3>
              <p className="card-text">{recipe.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">
          No recommendations available. Add some favorites to get
          recommendations!
        </p>
      )}
    </div>
  );
};

export default RecommendationsList;

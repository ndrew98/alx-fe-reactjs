// src/components/RecipeDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import recipeData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the recipe with the matching ID from data.json
    const foundRecipe = recipeData.find((recipe) => recipe.id === parseInt(id));

    if (foundRecipe) {
      setRecipe(foundRecipe);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="text-xl">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Recipe not found!</p>
          <Link
            to="/"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Return to Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-6 text-blue-500 hover:text-blue-700 transition-colors"
      >
        &larr; Back to Recipes
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-600 mb-6">{recipe.summary}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">
                Ingredients
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                {recipe.ingredients &&
                  recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      {ingredient}
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 border-b border-gray-200 pb-2">
                Instructions
              </h2>
              <ol className="list-decimal pl-5 space-y-4">
                {recipe.instructions &&
                  recipe.instructions.map((step, index) => (
                    <li key={index} className="text-gray-700">
                      {step}
                    </li>
                  ))}
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center text-gray-500">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <span>
                  Cooking Time: {recipe.cookingTime || "Not specified"}
                </span>
              </div>

              <div className="flex items-center text-gray-500 mt-2">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </span>
                <span>Serves: {recipe.servings || "Not specified"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

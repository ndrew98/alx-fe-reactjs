import { useState, useEffect } from "react";
import recipeData from "../data.json";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    //load recipe data from JSON file
    setRecipes(recipeData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Recipe sharing Platform
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-yellow-50 shadow-md overflow-hidden rounded-lg hover:shadow-xl transition-shadow duration-300  hover: scale-105 transform transition-transform "
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full  h-48"
            />
            <div className="px-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-500 mb-4">{recipe.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

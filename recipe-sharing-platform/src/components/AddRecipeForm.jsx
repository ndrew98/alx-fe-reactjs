// src/components/AddRecipeForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddRecipeForm = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    image: "https://via.placeholder.com/350",
    ingredients: "",
    instructions: "",
    cookingTime: "",
    servings: "",
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }

    if (!formData.summary.trim()) {
      newErrors.summary = "Recipe summary is required";
    }

    if (!formData.ingredients.trim()) {
      newErrors.ingredients = "Ingredients are required";
    } else {
      // Check if there are at least two ingredients (roughly checking for multiple lines or comma separation)
      const ingredientCount = formData.ingredients
        .split(/\r?\n|,/)
        .filter((item) => item.trim().length > 0).length;
      if (ingredientCount < 2) {
        newErrors.ingredients = "Please add at least two ingredients";
      }
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = "Cooking instructions are required";
    } else {
      // Check if there are at least two steps
      const stepCount = formData.instructions
        .split(/\r?\n|,/)
        .filter((item) => item.trim().length > 0).length;
      if (stepCount < 2) {
        newErrors.instructions = "Please add at least two cooking steps";
      }
    }

    if (!formData.cookingTime.trim()) {
      newErrors.cookingTime = "Cooking time is required";
    }

    if (!formData.servings.trim()) {
      newErrors.servings = "Number of servings is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // In a real app, you would send this data to an API
      console.log("Form submitted:", formData);

      // Format the data for storage
      const newRecipe = {
        ...formData,
        id: Date.now(), // Generate a temporary ID
        ingredients: formData.ingredients.split("\n").filter((i) => i.trim()),
        instructions: formData.instructions.split("\n").filter((i) => i.trim()),
      };

      // Simulate API call with timeout
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after submission
        setTimeout(() => {
          setFormData({
            title: "",
            summary: "",
            image: "https://via.placeholder.com/350",
            ingredients: "",
            instructions: "",
            cookingTime: "",
            servings: "",
          });
          setSubmitSuccess(false);
          // In a real app, you might navigate to the new recipe
          // navigate(`/recipe/${newRecipe.id}`);
        }, 2000);
      }, 1000);
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Add a New Recipe</h1>

      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Recipe added successfully!</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto"
      >
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            placeholder="e.g., Homemade Chocolate Chip Cookies"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="summary"
            className="block text-gray-700 font-semibold mb-2"
          >
            Recipe Summary *
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.summary
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            rows="2"
            placeholder="Briefly describe your recipe"
          />
          {errors.summary && (
            <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 font-semibold mb-2"
          >
            Ingredients * (one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.ingredients
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            rows="6"
            placeholder="2 cups all-purpose flour&#10;1/2 teaspoon baking soda&#10;1/2 cup butter&#10;..."
          />
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="instructions"
            className="block text-gray-700 font-semibold mb-2"
          >
            Cooking Instructions * (one step per line)
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errors.instructions
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:ring-blue-200"
            }`}
            rows="8"
            placeholder="Preheat oven to 350°F (175°C).&#10;Beat butter and sugar until smooth.&#10;Add eggs and vanilla, mix well.&#10;..."
          />
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="cookingTime"
              className="block text-gray-700 font-semibold mb-2"
            >
              Cooking Time *
            </label>
            <input
              type="text"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.cookingTime
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="e.g., 30 minutes"
            />
            {errors.cookingTime && (
              <p className="text-red-500 text-sm mt-1">{errors.cookingTime}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="servings"
              className="block text-gray-700 font-semibold mb-2"
            >
              Servings *
            </label>
            <input
              type="text"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.servings
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
              placeholder="e.g., 4"
            />
            {errors.servings && (
              <p className="text-red-500 text-sm mt-1">{errors.servings}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg text-white font-semibold ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition-colors"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Add Recipe"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;

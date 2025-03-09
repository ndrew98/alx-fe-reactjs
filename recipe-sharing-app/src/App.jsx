import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              Recipe Sharing App
            </Link>
            <div className="navbar-nav">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/favorites" className="nav-link">
                Favorites
              </Link>
            </div>
          </div>
        </nav>

        <SearchBar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <div className="row mt-4">
                  <div className="col-md-8">
                    <RecipeList />
                  </div>
                  <div className="col-md-4">
                    <RecommendationsList />
                  </div>
                </div>
              </>
            }
          />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

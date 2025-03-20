// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Recipe Sharing Platform</h1>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Recipe Sharing Platform</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

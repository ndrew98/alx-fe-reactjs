import React, { useState } from "react";
import { githubService } from "../services/githubService";

function Search() {
  // State for search parameters
  const [searchParams, setSearchParams] = useState({
    username: "",
    location: "",
    minRepos: "",
  });

  // State for search results
  const [searchResults, setSearchResults] = useState({
    items: [],
    totalCount: 0,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    // const [name, value] = e.target;
    const name = e.target.name;
    const value = e.target.value;

    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous search state
    setSearchResults({ items: [], totalCount: 0 });
    setError(null);
    setCurrentPage(1);

    // Validate at least one search parameter is provided
    if (
      !searchParams.username &&
      !searchParams.location &&
      !searchParams.minRepos
    ) {
      setError("Please provide at least one search parameter");
      return;
    }

    // Set loading state
    setLoading(true);

    try {
      // Perform advanced search
      const results = await githubService.fetchUserData({
        ...searchParams,
        page: currentPage,
        perPage: 10,
      });

      // Set search results
      setSearchResults({
        items: results.items,
        totalCount: results.total_count,
      });
    } catch (err) {
      // Handle errors
      setError(err.message || "An error occurred while searching");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Handle pagination
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const results = await githubService.fetchUserData({
        ...searchParams,
        page: nextPage,
        perPage: 10,
      });

      setSearchResults((prev) => ({
        items: [...prev.items, ...results.items],
        totalCount: results.total_count,
      }));
      setCurrentPage(nextPage);
    } catch (err) {
      setError("Failed to load more results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Advanced Search Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Username Input */}
          <input
            type="text"
            name="username"
            value={searchParams.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Location Input */}
          <input
            type="text"
            name="location"
            value={searchParams.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Minimum Repositories Input */}
          <input
            type="number"
            name="minRepos"
            value={searchParams.minRepos}
            onChange={handleInputChange}
            placeholder="Min Repositories"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Error Handling */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search Results */}
      {searchResults.totalCount > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">
            {searchResults.totalCount} Users Found
          </h2>

          <div className="grid gap-4">
            {searchResults.items.map((user) => (
              <div
                key={user.id}
                className="flex items-center bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                {/* User Avatar */}
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s avatar`}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />

                <div className="flex-grow">
                  {/* Username */}
                  <h3 className="font-bold text-lg">{user.login}</h3>

                  {/* Profile Link */}
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {searchResults.items.length < searchResults.totalCount && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="w-full mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      )}

      {/* No Results Message */}
      {searchResults.totalCount === 0 && !loading && (
        <div className="text-center text-gray-600">
          Looks like we cant find the user
        </div>
      )}
    </div>
  );
}

export default Search;

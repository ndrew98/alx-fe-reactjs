import React from "react";
import { useState } from "react";
import { githubService } from "../services/githubService";

const Search = () => {
  // State variables to manage component's data and UI state
  // username: stores the current input value
  // userData: stores the fetched user data
  // loading: indicates if API call is in progress
  // error: stores any error messages from API call
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handler for form submission
  const handleSearch = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    //on submit , reset previous search state
    //clear any previous user data, errors and prepare for a new search
    setUserData(null);
    setError(null);

    //set loading to true to indicate that API call is in progress or a search is in progress
    setLoading(true);

    try {
      //Attempt to fetch user data using the githubService
      // Passes the username entered by the user
      const data = await githubService.fetchUserData(username);

      // If data is successfully fetched, update userData
      setUserData(data);
      // Set loading to false as data retrieval is complete
      setLoading(false);
    } catch (err) {
      // If an error occurs during fetch
      // Set error message
      setError(err.message);
      // Set loading to false
      setLoading(false);
    }
  };
  //Handle for form submission
  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a GitHub user"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* Conditional rendering for different states */}

      {/* Loading state - shown while fetching data */}
      {loading && <p className="loading-message">Loading...</p>}

      {/* Error state - shown if user not found or API call fails */}
      {error && (
        <p className="error-message">Looks like we cant find the user</p>
      )}

      {/* Success state - display user information when data is retrieved */}
      {userData && (
        <div className="user-card">
          {/* User Avatar */}
          <img
            src={userData.avatar_url}
            alt={`${userData.name}'s avatar`}
            className="user-avatar"
          />

          {/* User Information Container */}
          <div className="user-info">
            {/* Display name (or username if name is not available) */}
            <h2>{userData.name || userData.login}</h2>

            {/* User bio (or default message if no bio) */}
            <p>{userData.bio || "No bio available"}</p>

            {/* User Statistics */}
            <div className="user-stats">
              <span>Followers: {userData.followers}</span>
              <span>Following: {userData.following}</span>
              <span>Public Repos: {userData.public_repos}</span>
            </div>

            {/* Link to GitHub Profile */}
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-link"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

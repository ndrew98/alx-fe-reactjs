import axios from "axios";

const GITHUB_API_BASE_URL =
  import.meta.env.VITE_GITHUB_API_BASE_URL || "https://api.github.com";

// Create an axios instance with default configurations
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    Accept: "application/vnd.github.v3+json",
  },
});

export const githubService = {
  /**
   * Advanced search for GitHub users with error handling and rate limit awareness
   * @param {Object} searchParams - Search parameters
   * @returns {Promise} Search results from GitHub API
   */
  async fetchUserData(searchParams) {
    try {
      // Construct query string based on provided parameters
      const queryParts = [];

      // Username or name
      if (searchParams.username) {
        queryParts.push(searchParams.username);
      }

      // Location filter
      if (searchParams.location) {
        queryParts.push(`location:${searchParams.location}`);
      }

      // Repositories count filter
      if (searchParams.minRepos) {
        queryParts.push(`repos:>=${searchParams.minRepos}`);
      }

      // Construct full query
      const query = queryParts.join(" ");

      // Make API request
      const response = await githubApi.get(
        `https://api.github.com/search/users?q`,
        {
          params: {
            q: query,
            page: searchParams.page || 1,
            per_page: searchParams.perPage || 10,
          },
        }
      );

      return response.data;
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        switch (error.response.status) {
          case 403:
            throw new Error("API rate limit exceeded. Please try again later.");
          case 422:
            throw new Error(
              "Invalid search parameters. Please check your input."
            );
          case 404:
            throw new Error("GitHub API endpoint not found.");
          default:
            throw new Error("An error occurred while searching users.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          "No response received from GitHub. Check your internet connection."
        );
      } else {
        // Something happened in setting up the request
        throw new Error("Error setting up the search request.");
      }
    }
  },

  /**
   * Fetch detailed user information
   * @param {string} username - GitHub username
   * @returns {Promise} Detailed user data
   */
  async fetchUserDetails(username) {
    try {
      const response = await githubApi.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            throw new Error(`User ${username} not found`);
          case 403:
            throw new Error("API rate limit exceeded");
          default:
            throw new Error("Failed to fetch user details");
        }
      }
      throw error;
    }
  },
};

import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const githubService = {
  /**
   * Advanced search for GitHub users
   * @param {Object} searchParams - Search parameters
   * @returns {Promise} Search results from GitHub API
   */
  async searchUsers(searchParams) {
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
      const response = await axios.get(`${GITHUB_API_BASE_URL}/search/users`, {
        params: {
          q: query,
          page: searchParams.page || 1,
          per_page: searchParams.perPage || 10,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error searching GitHub users:", error);
      throw error;
    }
  },

  /**
   * Fetch detailed user information
   * @param {string} username - GitHub username
   * @returns {Promise} Detailed user data
   */
  async fetchUserDetails(username) {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE_URL}/users/${username}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for user ${username}:`, error);
      throw error;
    }
  },
};

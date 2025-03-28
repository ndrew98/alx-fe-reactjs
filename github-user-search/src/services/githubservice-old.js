import axios from "axios";

// Base URL for GitHub API
const GITHUB_API_BASE_URL = "https://api.github.com";

export const githubService = {
  /**
   * Fetches user data from GitHub API
   * @param {string} username - GitHub username to search
   * @returns {Promise} Promise resolving to user data
   * @throws {Error} Throws error if user not found or API call fails
   */
  async fetchUserData(username) {
    try {
      // Make GET request to GitHub API user endpoint
      const response = await axios.get(
        `${GITHUB_API_BASE_URL}/users/${username}`
      );

      // Return the user data
      return response.data;
    } catch (error) {
      // Handle specific 404 error (user not found)
      if (error.response && error.response.status === 404) {
        throw new Error("User not found");
      }

      // Rethrow other types of errors
      throw error;
    }
  },
};

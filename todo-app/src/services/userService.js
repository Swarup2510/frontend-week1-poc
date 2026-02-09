import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const userService = {
  /**
   * Fetch all users from the API
   * @returns {Promise<Array>} Array of user objects
   * @throws {Error} If the request fails
   */
  getAllUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },
};

export default userService;

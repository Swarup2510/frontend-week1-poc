import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const postService = {
  /**
   * Fetch all posts from the API
   * @returns {Promise<Array>} Array of post objects
   * @throws {Error} If the request fails
   */
  getAllPosts: async () => {
    try {
      const response = await apiClient.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
  },

  /**
   * Create a new post
   * @param {Object} postData - Post data (title, body, userId)
   * @returns {Promise<Object>} Created post object
   * @throws {Error} If the request fails
   */
  createPost: async (postData) => {
    try {
      const response = await apiClient.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create post: ${error.message}`);
    }
  },
};

export default postService;

import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Bonus: Create post
export const createPost = async (post) => {
  const response = await axios.post(API_URL, post);
  return response.data;
};
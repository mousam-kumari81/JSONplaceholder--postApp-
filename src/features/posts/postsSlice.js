import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById, createPost } from './postsAPI';

const initialState = {
  posts: [],
  currentPost: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  searchTerm: '',
  currentPage: 1,
  postsPerPage: 10,
};

// Async thunks
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  const response = await fetchPosts();
  return response;
});

export const getPostById = createAsyncThunk('posts/getPostById', async (id) => {
  const response = await fetchPostById(id);
  return response;
});

// Bonus: Create post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  const response = await createPost(post);
  return response;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getPostById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentPost = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Bonus: Handle create post
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload); // Add new post at beginning
      });
  },
});

export const { setSearchTerm, setCurrentPage } = postsSlice.actions;

// Selectors
export const selectAllPosts = (state) => state.posts.posts;
export const selectCurrentPost = (state) => state.posts.currentPost;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectSearchTerm = (state) => state.posts.searchTerm;
export const selectCurrentPage = (state) => state.posts.currentPage;
export const selectPostsPerPage = (state) => state.posts.postsPerPage;

// Derived selectors
export const selectFilteredPosts = (state) => {
  const posts = selectAllPosts(state);
  const searchTerm = selectSearchTerm(state);
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectPaginatedPosts = (state) => {
  const filteredPosts = selectFilteredPosts(state);
  const currentPage = selectCurrentPage(state);
  const postsPerPage = selectPostsPerPage(state);
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  return filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
};

export const selectTotalPages = (state) => {
  const filteredPosts = selectFilteredPosts(state);
  const postsPerPage = selectPostsPerPage(state);
  
  return Math.ceil(filteredPosts.length / postsPerPage);
};

export default postsSlice.reducer;
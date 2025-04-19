import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, selectPaginatedPosts, selectPostsStatus, selectPostsError } from '../../features/posts/postsSlice';
import PostCard from '../../components/PostCard/PostCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPaginatedPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPosts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div className="loading-message">Loading posts...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    );
  } else if (status === 'failed') {
    content = <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <SearchBar />
        {content}
        <Pagination />
      </div>
    </div>
  );
};

export default HomePage;
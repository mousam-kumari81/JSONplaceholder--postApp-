import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, selectCurrentPost, selectPostsStatus } from '../../features/posts/postsSlice';
import PostDetail from '../../components/PostDetail/PostDetail';
import './PostPage.css';

console.log('PostDetail import:', PostDetail);
console.log('Type of PostDetail:', typeof PostDetail);

const PostPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectCurrentPost);
  const status = useSelector(selectPostsStatus);

  useEffect(() => {
    dispatch(getPostById(id));
  }, [id, dispatch]);

  if (status === 'loading') return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="post-page">
      <div className="container">
        <PostDetail post={post} />
      </div>
    </div>
  );
};

export default PostPage;
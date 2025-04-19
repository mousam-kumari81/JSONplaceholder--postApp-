import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = ({ post }) => {
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="post-detail"
    >
      <div className="post-detail-content">
        <h2 className="post-detail-title">{post.title}</h2>
        <p className="post-detail-body">{post.body}</p>
        <Link to="/" className="back-button">
          Back to Posts
        </Link>
      </div>
    </motion.div>
  );
};

// This is crucial - must be default export
export default PostDetail;
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="post-card"
    >
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-body">{post.body}</p>
        <Link to={`/posts/${post.id}`} className="read-more">
          Read More
        </Link>
      </div>
    </motion.div>
  );
};

export default PostCard;
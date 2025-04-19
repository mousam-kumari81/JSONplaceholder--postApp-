import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../features/posts/postsSlice';
import { selectTotalPages, selectCurrentPage } from '../../features/posts/postsSlice';
import './Pagination.css';

const Pagination = () => {
  const dispatch = useDispatch();
  const totalPages = useSelector(selectTotalPages);
  const currentPage = useSelector(selectCurrentPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <nav className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => dispatch(setCurrentPage(page))}
            className={`pagination-button ${
              currentPage === page ? 'pagination-button-active' : ''
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
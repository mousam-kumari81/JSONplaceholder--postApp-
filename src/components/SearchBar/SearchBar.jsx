import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../features/posts/postsSlice';
import './SearchBar.css';

const SearchBar = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
  };

  return (
    <form onSubmit={handleSearch} className="search-container">
      <div className="search-form">
        <input
          type="text"
          value={localSearchTerm}
          onChange={(e) => setLocalSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="search-input"
        />
        <button
          type="submit"
          className="search-button"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
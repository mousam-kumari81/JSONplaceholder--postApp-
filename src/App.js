import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import Navbar from './components/Navbar';
import './App.css';

// Debug imports


//console.log(typeof HomePage, typeof PostPage, typeof Navbar);

function App() {
  console.log('Navbar type:', typeof Navbar);
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:id" element={<PostPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
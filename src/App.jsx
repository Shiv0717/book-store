import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

// Components
import MyNavbar from './components/Navbar';
import List from './pages/List';
import Home from './pages/Home';
import BookDetails from './components/BookDetails';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Profile from './pages/Profile';

// CSS
import "bootstrap/dist/css/bootstrap.min.css";

const AppContent = () => {
  const location = useLocation();

  // Show footer only on Home and Book List pages
  const showFooter = location.pathname === '/home' || location.pathname === '/book/list';

  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route 
          path="/book/list" 
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          } 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/view/:id" element={<BookDetails />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;

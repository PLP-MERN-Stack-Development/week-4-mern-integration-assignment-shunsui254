import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreateEditPost from './pages/CreateEditPost';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/new" element={<CreateEditPost />} />
            <Route path="/posts/:id/edit" element={<CreateEditPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <div className="container">
            <p>&copy; 2024 MERN Blog. Built with MongoDB, Express, React, and Node.js.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;

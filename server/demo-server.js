// Demo server without database - for testing the frontend
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for demo
const samplePosts = [
  {
    _id: '1',
    title: 'Getting Started with MERN Stack',
    content: 'The MERN stack is a powerful combination of technologies for building modern web applications. MongoDB provides a flexible document database, Express.js offers a minimal web framework for Node.js, React creates dynamic user interfaces, and Node.js serves as the JavaScript runtime environment.',
    excerpt: 'Learn how to build modern web applications using MongoDB, Express.js, React, and Node.js',
    author: { _id: '1', name: 'John Doe', email: 'john@example.com' },
    category: { _id: '1', name: 'Technology', slug: 'technology', color: '#3B82F6' },
    tags: ['MERN', 'JavaScript', 'Web Development', 'React', 'Node.js'],
    isPublished: true,
    viewCount: 42,
    slug: 'getting-started-with-mern-stack',
    createdAt: new Date('2024-01-15'),
    comments: []
  },
  {
    _id: '2',
    title: '10 Tips for Better Work-Life Balance',
    content: 'Maintaining a healthy work-life balance is crucial for your mental health, productivity, and overall well-being. In today\'s fast-paced world, it\'s easy to get caught up in work and forget about the other important aspects of life.',
    excerpt: 'Discover practical strategies to maintain a healthy balance between your professional and personal life',
    author: { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    category: { _id: '2', name: 'Lifestyle', slug: 'lifestyle', color: '#10B981' },
    tags: ['Lifestyle', 'Wellness', 'Productivity', 'Mental Health'],
    isPublished: true,
    viewCount: 28,
    slug: '10-tips-for-better-work-life-balance',
    createdAt: new Date('2024-01-10'),
    comments: []
  },
  {
    _id: '3',
    title: 'Hidden Gems: 5 Underrated Travel Destinations',
    content: 'While popular tourist destinations have their charm, there\'s something special about discovering hidden gems that haven\'t been overrun by crowds. These underrated destinations offer authentic experiences, stunning landscapes, and rich cultural heritage.',
    excerpt: 'Explore five amazing travel destinations that offer incredible experiences away from the tourist crowds',
    author: { _id: '2', name: 'Jane Smith', email: 'jane@example.com' },
    category: { _id: '3', name: 'Travel', slug: 'travel', color: '#F59E0B' },
    tags: ['Travel', 'Adventure', 'Hidden Gems', 'Culture'],
    isPublished: true,
    viewCount: 35,
    slug: 'hidden-gems-5-underrated-travel-destinations',
    createdAt: new Date('2024-01-05'),
    comments: []
  }
];

const sampleCategories = [
  { _id: '1', name: 'Technology', slug: 'technology', color: '#3B82F6', description: 'Latest tech trends and innovations' },
  { _id: '2', name: 'Lifestyle', slug: 'lifestyle', color: '#10B981', description: 'Tips for better living' },
  { _id: '3', name: 'Travel', slug: 'travel', color: '#F59E0B', description: 'Explore the world' }
];

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'MERN Blog API is running (Demo Mode)',
    status: 'OK',
    note: 'This is a demo server with sample data. Connect to MongoDB for full functionality.'
  });
});

// Posts API routes
app.get('/api/posts', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const search = req.query.search;
  
  let filteredPosts = [...samplePosts];
  
  // Filter by category
  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category.slug === category);
  }
  
  // Search functionality
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower)
    );
  }
  
  const total = filteredPosts.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: paginatedPosts,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

app.get('/api/posts/:id', (req, res) => {
  const post = samplePosts.find(p => p._id === req.params.id || p.slug === req.params.id);
  if (!post) {
    return res.status(404).json({
      success: false,
      error: 'Post not found'
    });
  }
  
  res.json({
    success: true,
    data: post
  });
});

// Categories API routes
app.get('/api/categories', (req, res) => {
  res.json({
    success: true,
    data: sampleCategories
  });
});

// Auth routes (demo)
app.post('/api/auth/login', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Authentication requires database connection. This is demo mode.'
  });
});

app.post('/api/auth/register', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Authentication requires database connection. This is demo mode.'
  });
});

// Catch all for unsupported endpoints
app.use('/api/*', (req, res) => {
  res.status(501).json({
    success: false,
    error: 'This endpoint requires database connection. This is demo mode with sample data.'
  });
});

app.listen(PORT, () => {
  console.log(`Demo server running on port ${PORT}`);
  console.log('📝 Demo Mode Active - Using sample data');
  console.log('🔗 Frontend should now work at http://localhost:3000');
  console.log('💡 To enable full functionality, connect to MongoDB and use the main server');
});

module.exports = app;

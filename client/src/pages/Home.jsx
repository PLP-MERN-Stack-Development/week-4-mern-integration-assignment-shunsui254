import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { postService, categoryService } from '../services/api';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: postsData, loading: postsLoading, error: postsError, refetch } = useApi(
    () => postService.getAllPosts(currentPage, 10, selectedCategory, searchQuery),
    [currentPage, selectedCategory, searchQuery]
  );

  const { data: categoriesData, loading: categoriesLoading } = useApi(
    () => categoryService.getAllCategories(),
    []
  );

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (postsLoading && currentPage === 1) return <Loading />;
  if (postsError) return <ErrorMessage message={postsError} onRetry={refetch} />;

  const posts = postsData?.data || [];
  const pagination = postsData?.pagination || {};
  const categories = categoriesData?.data || [];

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      {/* Search and Filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              name="search"
              placeholder="Search posts..."
              className="form-input"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>

        {/* Category Filter */}
        {!categoriesLoading && categories.length > 0 && (
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Filter by Category:</h4>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleCategoryChange('')}
                className={selectedCategory === '' ? 'btn btn-primary' : 'btn btn-outline'}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={selectedCategory === category.slug ? 'btn btn-primary' : 'btn btn-outline'}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Welcome Message */}
      {!searchQuery && !selectedCategory && (
        <div className="card" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1>Welcome to MERN Blog</h1>
          <p>Discover amazing stories and insights from our community of writers.</p>
        </div>
      )}

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>No posts found</h3>
          <p>
            {searchQuery || selectedCategory 
              ? 'Try adjusting your search criteria.'
              : 'Be the first to create a post!'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-2">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline"
              >
                Previous
              </button>
              
              <span style={{ 
                display: 'flex', 
                alignItems: 'center',
                padding: '0 1rem'
              }}>
                Page {pagination.page} of {pagination.pages}
              </span>
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="btn btn-outline"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

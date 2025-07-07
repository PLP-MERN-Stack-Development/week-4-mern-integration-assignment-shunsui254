import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card">
      <div style={{ marginBottom: '1rem' }}>
        <span 
          style={{ 
            backgroundColor: post.category?.color || '#3b82f6',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}
        >
          {post.category?.name}
        </span>
      </div>
      
      <h2 style={{ marginBottom: '0.5rem' }}>
        <Link 
          to={`/posts/${post.slug || post._id}`}
          style={{ color: '#1e293b', textDecoration: 'none' }}
        >
          {post.title}
        </Link>
      </h2>
      
      {post.excerpt && (
        <p style={{ color: '#64748b', marginBottom: '1rem' }}>
          {post.excerpt}
        </p>
      )}
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: '0.875rem',
        color: '#64748b'
      }}>
        <div>
          By {post.author?.name} • {formatDate(post.createdAt)}
        </div>
        <div>
          {post.viewCount} views
        </div>
      </div>
      
      {post.tags && post.tags.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          {post.tags.map((tag, index) => (
            <span 
              key={index}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                padding: '0.125rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                marginRight: '0.5rem'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;

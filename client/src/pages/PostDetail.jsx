import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { postService } from '../services/api';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const PostDetail = () => {
  const { id } = useParams();
  const [refreshComments, setRefreshComments] = useState(0);

  const { data: postData, loading, error, refetch } = useApi(
    () => postService.getPost(id),
    [id, refreshComments]
  );

  const handleCommentAdded = () => {
    setRefreshComments(prev => prev + 1);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  const post = postData?.data;
  if (!post) return <ErrorMessage message="Post not found" />;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <article>
        {/* Post Header */}
        <div className="card">
          <div style={{ marginBottom: '1rem' }}>
            <span 
              style={{ 
                backgroundColor: post.category?.color || '#3b82f6',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {post.category?.name}
            </span>
          </div>
          
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            {post.title}
          </h1>
          
          {post.excerpt && (
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#64748b',
              fontStyle: 'italic',
              marginBottom: '1.5rem'
            }}>
              {post.excerpt}
            </p>
          )}
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            paddingBottom: '1rem',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div>
                <strong>{post.author?.name}</strong>
                {post.author?.bio && (
                  <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                    {post.author.bio}
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.875rem', color: '#64748b' }}>
              <div>{formatDate(post.createdAt)}</div>
              <div>{post.viewCount} views</div>
            </div>
          </div>
          
          {/* Post Content */}
          <div style={{ 
            lineHeight: 1.8,
            fontSize: '1.125rem',
            whiteSpace: 'pre-wrap'
          }}>
            {post.content}
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Tags:</h4>
              <div>
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    style={{
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      marginRight: '0.5rem',
                      marginBottom: '0.5rem',
                      display: 'inline-block'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Comments Section */}
        <div style={{ marginTop: '3rem' }}>
          <CommentForm postId={post._id} onCommentAdded={handleCommentAdded} />
          <CommentList comments={post.comments} />
        </div>
      </article>
    </div>
  );
};

export default PostDetail;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postService } from '../services/api';
import { useAsyncMutation } from '../hooks/useApi';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const { isAuthenticated } = useAuth();
  const { mutate, loading, error } = useAsyncMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await mutate(() => postService.addComment(postId, { content }));
      setContent('');
      onCommentAdded();
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="card">
        <p>Please login to leave a comment.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Leave a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Write your comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !content.trim()}
        >
          {loading ? 'Adding Comment...' : 'Add Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;

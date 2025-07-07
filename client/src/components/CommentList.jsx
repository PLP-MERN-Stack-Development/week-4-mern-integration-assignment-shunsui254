import React from 'react';

const CommentList = ({ comments }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="card">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="card" style={{ marginBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <strong>{comment.user?.name || 'Anonymous'}</strong>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;

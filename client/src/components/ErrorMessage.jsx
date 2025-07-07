import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card" style={{ textAlign: 'center', color: '#ef4444' }}>
      <h3>Error</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;

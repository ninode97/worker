import React from 'react';

export function formatError(error) {
  if (error) {
    return (
      <div
        style={{
          fontSize: '1.5rem',
          color: 'red'
        }}
        className="view_error"
      >
        {error.error}
      </div>
    );
  }
  return null;
}

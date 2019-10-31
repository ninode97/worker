import React from 'react';

export function formatMessage(message) {
  console.log(message);
  if (!message) {
    return null;
  } else if (message.type === 'success') {
    return (
      <div
        style={{ color: 'green' }}
        className="flash-message flash-message__succces"
      >
        <span>{message.content}</span>
      </div>
    );
  } else if (message.type === 'error') {
    return (
      <div
        style={{ color: 'red' }}
        className="flash-message flash-message__error"
      >
        <span>{message.content}</span>
      </div>
    );
  }
}

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

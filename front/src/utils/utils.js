import React from 'react';

export function formatMessage(message) {
  console.log(message);
  if (message.type === 'success') {
    console.log(message);
    return (
      <div
        style={{ color: 'green' }}
        className="flash-message flash-message__succces"
      >
        <span>{message.message}</span>
      </div>
    );
  } else if (message.type === 'error') {
    console.log(message);
    return (
      <div
        style={{ color: 'red' }}
        className="flash-message flash-message__error"
      >
        <span>{message.message}</span>
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

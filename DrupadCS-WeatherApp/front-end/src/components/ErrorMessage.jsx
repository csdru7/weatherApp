import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    <div className="text-center mt-3">
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    </div>
  )
};

export default ErrorMessage;

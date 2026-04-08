import React from 'react';
import { useSelector } from 'react-redux';

const LoadingSpinner = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay" id="loading-overlay">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <span className="loading-text">Processing...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;

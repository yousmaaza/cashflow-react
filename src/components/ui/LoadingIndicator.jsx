import React from 'react';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200">
        <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
        <span className="text-sm text-gray-600">Traitement en cours...</span>
      </div>
    </div>
  );
};

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default LoadingIndicator;
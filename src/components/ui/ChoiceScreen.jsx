import React from 'react';
import { Upload, Database } from 'lucide-react';

const ChoiceScreen = ({ onUploadChoice, onViewChoice }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12">
      <button
        onClick={onUploadChoice}
        className="group p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border-2 border-transparent hover:border-blue-500"
      >
        <div className="p-4 rounded-full bg-blue-50 w-16 h-16 mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
          <Upload className="h-8 w-8 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload New PDF</h3>
        <p className="text-gray-600">Process a new bank statement</p>
      </button>

      <button
        onClick={onViewChoice}
        className="group p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center border-2 border-transparent hover:border-green-500"
      >
        <div className="p-4 rounded-full bg-green-50 w-16 h-16 mx-auto mb-4 group-hover:bg-green-100 transition-colors">
          <Database className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">View Existing Data</h3>
        <p className="text-gray-600">Browse previously processed statements</p>
      </button>
    </div>
  );
};

export default ChoiceScreen;
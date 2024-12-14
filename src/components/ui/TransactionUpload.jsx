import React, { useState, useRef } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

const TransactionUpload = ({ onUploadSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = async (file) => {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF files are allowed');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process PDF');
      }

      const data = await response.json();
      if (onUploadSuccess) {
        onUploadSuccess(data.transactions);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsDragActive(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div
        className={`relative overflow-hidden rounded-xl p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive 
            ? 'border-2 border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]' 
            : 'border-2 border-gray-200 hover:border-blue-400 bg-white shadow-md hover:shadow-lg'
          }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          handleDrop(file);
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleDrop(e.target.files[0])}
          accept=".pdf"
          className="hidden"
        />
        <div className="flex flex-col items-center gap-4">
          <div className={`p-4 rounded-full bg-blue-50 transition-transform duration-300 ${
            isDragActive ? 'transform rotate-12' : ''
          }`}>
            <Upload className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isDragActive ? "Drop your PDF here" : "Upload your bank statement"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Drag and drop your PDF file, or click to browse
            </p>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Processing...</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default TransactionUpload;
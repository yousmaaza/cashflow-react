import React from 'react';

export const UploadZone = ({ onFileSelect }) => {
  return (
    <div className="upload-zone relative border-2 border-dashed rounded-lg p-12 hover:border-accent-primary transition-colors dark:border-opacity-40 dark:hover:border-opacity-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="rounded-full bg-accent-primary bg-opacity-10 p-4">
          <svg className="h-8 w-8 text-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">Drag and drop your PDF file, or click to browse</p>
        </div>
      </div>
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={onFileSelect}
        accept=".pdf"
      />
    </div>
  );
};

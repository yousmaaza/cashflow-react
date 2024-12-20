import React, { useState } from 'react';
import { uploadPDF } from '../../services/api';

const PDFUploader: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      await uploadPDF(file);
      // Handle successful upload
    } catch (err) {
      setError('Error uploading file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {loading && <p className="mt-2 text-gray-600">Uploading...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default PDFUploader;
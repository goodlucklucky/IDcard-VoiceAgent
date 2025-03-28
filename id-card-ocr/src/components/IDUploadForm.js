import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiLoader, FiX } from 'react-icons/fi';

const IDUploadForm = ({ onFileUpload, processing, onExtractedData }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 100 * 1024, // 100KB
    multiple: false,
    onDrop: acceptedFiles => {
      setError(null);
      const file = acceptedFiles[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        onFileUpload(file);
      }
    },
    onDropRejected: rejectedFiles => {
      if (rejectedFiles.length > 0) {
        const firstFile = rejectedFiles[0];
        if (firstFile.file.size > 100 * 1024) {
          setError('File size exceeds 100KB limit');
        } else {
          setError('Invalid file type. Please upload JPEG, PNG, or WebP');
        }
      }
    }
  });

  const removeImage = () => {
    setPreview(null);
    onFileUpload(null);
    setError(null);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Upload image (Optional)</h2>
      <p className="text-gray-600 mb-3">Upload an image of your ID</p>
      <p className="text-sm text-gray-500 mb-4">Supported formats: PNG, JPG, JPEG, WebP (max: 100KB)</p>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {preview ? (
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-60 mx-auto mb-2"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            aria-label="Remove image"
          >
            <FiX size={16} />
          </button>
          {processing && (
            <div className="mt-2 flex items-center justify-center text-blue-600">
              <FiLoader className="animate-spin mr-2" />
              Processing your ID...
            </div>
          )}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition ${
            processing ? 'opacity-50 pointer-events-none' : ''
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-gray-400 text-2xl mb-2" />
          <p className="text-gray-600">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-400">PNG, JPG, JPEG, WebP up to 100KB</p>
        </div>
      )}
    </div>
  );
};

export default IDUploadForm;

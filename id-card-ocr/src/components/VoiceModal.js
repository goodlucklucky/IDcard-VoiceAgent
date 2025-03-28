import React from 'react';
import { FiMic, FiX } from 'react-icons/fi';

const VoiceModal = ({ onAccept, onReject }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          <FiMic className="inline mr-2" />
          Do you want a Voice Assistant to help fill out this form?
        </h2>
        <p className="text-gray-600 mb-6">
          The assistant will guide you through the process using voice commands.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onAccept}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          >
            <FiMic className="mr-2" /> YES
          </button>
          <button
            onClick={onReject}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
          >
            <FiX className="mr-2" /> NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceModal;

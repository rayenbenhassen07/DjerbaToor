import React from "react";

const SuccessModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
        <h2 className="text-xl font-bold text-green-600">Success</h2>
        <p className="mt-4 text-gray-700">
          Your reservation was created successfully! We will call you back to
          confirm your reservation
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              onClose();
              window.location.reload(); // Refresh the page
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;

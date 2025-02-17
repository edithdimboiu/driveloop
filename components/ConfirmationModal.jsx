const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-5">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{message}</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

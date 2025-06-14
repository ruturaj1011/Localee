const ConfirmationCard = ({ role, btnRole, onClose, onConfirm, isLoading = false }) => {

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Confirm Action
          </h3>
          <p className="text-gray-600 text-center">
            Are you sure you want to <span className="font-bold">{btnRole}</span> this booking?
          </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="px-6 py-2 rounded-lg text-white bg-gray-400 hover:bg-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                btnRole === "accept" ? "bg-green-600 hover:bg-green-700" :
                btnRole === "reject" ? "bg-red-600 hover:bg-red-700" :
                "bg-yellow-600 hover:bg-yellow-700"
              }`}
              onClick={() => onConfirm(btnRole)}
              disabled={isLoading}
            >
              {isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isLoading ? 'Processing...' : `${btnRole.charAt(0).toUpperCase() + btnRole.slice(1)} Booking`}
            </button>
          </div>
        </div>
    );
}

export default ConfirmationCard;
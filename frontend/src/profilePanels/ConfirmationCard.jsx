
const ConfirmationCard = ({ role, btnRole, onClose, onConfirm }) => {

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
              className="px-6 py-2 rounded-lg text-white bg-gray-400 hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-white transition ${
                btnRole === "accept" ? "bg-green-600 hover:bg-green-700" :
                btnRole === "reject" ? "bg-red-600 hover:bg-red-700" :
                "bg-yellow-600 hover:bg-yellow-700"
              }`}
              onClick={() => onConfirm(btnRole)}
            >
              {btnRole.charAt(0).toUpperCase() + btnRole.slice(1)} Booking
            </button>
          </div>
        </div>
    );
}

export default ConfirmationCard;
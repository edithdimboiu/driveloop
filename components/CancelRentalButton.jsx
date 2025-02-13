"use client";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import cancelRental from "@/app/services/cancelRental";
import { useRentalsContext } from "@/app/context/rentalsContext";

const CancelRentalButton = ({ rentalId }) => {
  const { deleteRentalFromState } = useRentalsContext();

  const handleCancelClick = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this rental?"
    );

    if (confirmed) {
      const { success, error } = await cancelRental(rentalId);
      if (success) {
        toast.success("Rental canceled successfully!");
        deleteRentalFromState(rentalId);
      } else {
        toast.error("Failed to cancel rental.", error);
      }
    }
  };

  return (
    <button
      onClick={handleCancelClick}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className="inline mr-1" /> Cancel
    </button>
  );
};

export default CancelRentalButton;

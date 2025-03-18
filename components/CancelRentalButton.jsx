"use client";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import cancelRental from "@/app/services/cancelRental";
import { useRentalsContext } from "@/app/context/rentalsContext";

const CancelRentalButton = ({ rentalId }) => {
  const { deleteRentalFromState } = useRentalsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = async () => {
    const { success, error } = await cancelRental(rentalId);
    if (success) {
      toast.success("Rental canceled successfully!");
      deleteRentalFromState(rentalId);
    } else {
      toast.error("Failed to cancel rental.", error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white md:px-4 px-2 sm:py-2 py-1 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
      >
        <FaTrash className="inline mr-1" /> Cancel
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancel}
        title="Confirm Cancelation"
        message="Are you sure you want to cancel this rental?"
      />
    </>
  );
};

export default CancelRentalButton;

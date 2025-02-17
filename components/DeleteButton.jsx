"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import deleteCar from "@/app/services/deleteCar";
import { useCarContext } from "@/app/context/carsContext";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";

const DeleteButton = ({ carId }) => {
  const { deleteCarFromState } = useCarContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    const { success, error } = await deleteCar(carId);
    if (success) {
      toast.success("Car deleted successfully!");
      deleteCarFromState(carId);
    } else {
      toast.error(error);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
      >
        <FaTrash className="inline mr-1" /> Delete
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this car?"
      />
    </>
  );
};

export default DeleteButton;

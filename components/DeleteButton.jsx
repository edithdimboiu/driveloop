"use client";

import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import deleteCar from "@/app/services/deleteCar";
import { useCarContext } from "@/app/context/carsContext";

const DeleteButton = ({ carId }) => {
  const { deleteCarFromState } = useCarContext();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (confirmed) {
      const { success, error } = await deleteCar(carId);
      if (success) {
        toast.success("Car deleted successfully!");
        deleteCarFromState(carId);
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-red-700"
    >
      <FaTrash className="inline mr-1" /> Delete
    </button>
  );
};

export default DeleteButton;

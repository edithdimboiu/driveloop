"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateCarStatus } from "@/app/services/updateCarStatus";
import { useCarContext } from "@/app/context/carsContext";

const MyCarCard = ({ car }) => {
  const carId = car._id ? car._id.toString() : null;
  const [isActive, setIsActive] = useState(car.isActive);
  const { updateCarInState } = useCarContext();

  const toggleCarStatus = async () => {
    try {
      const updatedStatus = !isActive;
      setIsActive(updatedStatus);

      const response = await updateCarStatus(carId, updatedStatus);

      if (!response.success) {
        throw new Error(response.error || "Failed to update car status");
      }

      updateCarInState(carId, { ...car, isActive: response.isActive });

      toast.success(`Car is now ${response.isActive ? "active" : "inactive"}`);
    } catch (error) {
      setIsActive(prev => !prev);
      toast.error(error.message || "Failed to update car status");
    }
  };

  return (
    <div className="bg-white shadow border rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-center">
      <div className="flex flex-col">
        <Link
          href={`/cars/${car._id}`}
          className="text-lg font-semibold text-gray-800 hover:underline"
        >
          {car.car_name}
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto  mt-2 sm:mt-0">
        <Link
          href={`/cars/edit/${car._id}`}
          className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto mr-2 mb-2 sm:mb-0 text-center hover:bg-green-700"
        >
          Edit
        </Link>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mr-2 mb-2 sm:w-auto sm:mb-0 text-center hover:bg-blue-700"
          onClick={toggleCarStatus}
        >
          {isActive ? "Active" : "Inactive"}
        </button>

        <DeleteButton carId={carId} />
      </div>
    </div>
  );
};

export default MyCarCard;

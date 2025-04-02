"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateCarStatus } from "@/app/services/updateCarStatus";
import { useCarContext } from "@/app/context/carsContext";
import RentedCarCard from "./RentedCarCard";
import { categorizeAndSortRentals } from "@/app/utils/rentals";
import { calculateRentalCost } from "@/app/utils/rentalCosts";
import Heading from "./Heading";

const MyCarCard = ({ car, rentals }) => {
  const carId = car._id ? car._id.toString() : null;
  const [isActive, setIsActive] = useState(car.isActive);
  const [showRevenueDetails, setShowRevenueDetails] = useState(false);
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

  const toggleRevenueDetails = () => {
    setShowRevenueDetails(prev => !prev);
  };

  const carRentals = rentals.filter(rental => rental.car_id === car._id);
  const categorizedRentals = categorizeAndSortRentals(carRentals);
  const totalRevenue = carRentals.reduce((acc, rental) => {
    const rentalCost = calculateRentalCost(
      rental.start_date_time,
      rental.end_date_time,
      rental.price_per_hour
    );
    return acc + rentalCost;
  }, 0);

  return (
    <div className="bg-white shadow border rounded-lg gap-1 p-2 mt-4 sm:p-4 flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <div className="w-3/5 flex flex-col">
          <Link
            href={`/cars/${car._id}`}
            className="text-lg font-semibold text-gray-800 hover:underline"
          >
            {car.car_name}
          </Link>

          {carRentals.length > 0 ? (
            <>
              <p className="text-gray-600 mt-2">
                Generated Revenue: CHF {totalRevenue.toFixed(2)}
              </p>
              <button
                onClick={toggleRevenueDetails}
                className="border border-blue-600 text-blue-600 py-1 px-3 rounded-md hover:bg-blue-100 mt-2 w-auto max-w-[150px]"
              >
                Rentals Details
              </button>
            </>
          ) : (
            <p className="text-gray-600 py-1 rounded-md block mt-2 max-w-[150px] text-left">
              No rentals yet
            </p>
          )}
        </div>

        <div className="flex flex-col w-2/5 sm:w-auto justify-self-end sm:flex-row mt-2 sm:mt-0">
          <Link
            href={`/cars/edit/${car._id}`}
            className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto sm:min-w-[105px] mr-2 mb-2 sm:mb-0 text-center hover:bg-green-700"
          >
            Edit
          </Link>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full mr-2 mb-2 sm:w-auto sm:min-w-[105px] sm:mb-0 text-center hover:bg-blue-700"
            onClick={toggleCarStatus}
          >
            {isActive ? "Active" : "Inactive"}
          </button>

          <DeleteButton carId={carId} />
        </div>
      </div>
      {/* Rentals details */}
      {showRevenueDetails && categorizedRentals.length > 0 && (
        <div className="bg-gray-100 mt-4 p-4 rounded-lg shadow-md">
          <Heading text="Rental History" extraClassName="text-lg" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categorizedRentals.map(rental => (
              <RentedCarCard
                key={rental._id}
                rental={rental}
                status={rental.status}
                showButtons={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCarCard;

"use client";

import Heading from "@/components/Heading";
import { useRentalsContext } from "../context/rentalsContext";
import RentedCarCard from "@/components/RentedCarCard";
import { categorizeAndSortRentals } from "../utils/rentals";

const RentedPage = () => {
  const { rentals } = useRentalsContext();
  const loading = rentals === undefined || rentals === null;
  if (loading) return <Heading text="" />;
  if (rentals.length === 0)
    return <Heading text="You haven't rented any car yet." />;

  const categorizedRentals = categorizeAndSortRentals(rentals);

  return (
    <>
      {categorizedRentals.map(rental => (
        <RentedCarCard
          key={rental._id}
          rental={rental}
          status={rental.status}
        />
      ))}
    </>
  );
};

export default RentedPage;

"use client";

import Heading from "@/components/Heading";
import { useRentalsContext } from "../context/rentalsContext";
import RentedCarCard from "@/components/RentedCarCard";

const RentedPage = () => {
  const { rentals } = useRentalsContext();
  const loading = rentals === undefined || rentals === null;

  return (
    <>
      {loading && <Heading text="" />}
      {!loading &&
        (rentals.length === 0 ? (
          <Heading text="You haven't rented any car yet." />
        ) : (
          rentals.map(rental => (
            <RentedCarCard key={rental._id} rental={rental} />
          ))
        ))}
    </>
  );
  s;
};

export default RentedPage;

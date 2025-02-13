"use client";

import Heading from "@/components/Heading";
import { useRentalsContext } from "../context/rentalsContext";
import { useState, useEffect } from "react";
import RentedCarCard from "@/components/RentedCarCard";

const RentedPage = () => {
  const { rentals } = useRentalsContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rentals !== undefined && rentals !== null) {
      setLoading(false);
    }
  }, [rentals]);

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

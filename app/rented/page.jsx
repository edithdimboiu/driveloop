"use client";

import Heading from "@/components/Heading";
import { useRentalsContext } from "../context/rentalsContext";
import RentedCarCard from "@/components/RentedCarCard";

const RentedPage = () => {
  const { rentals } = useRentalsContext();
  const loading = rentals === undefined || rentals === null;
  if (loading) return <Heading text="" />;
  if (rentals.length === 0)
    return <Heading text="You haven't rented any car yet." />;

  const now = new Date();

  const categorizedRentals = rentals
    .map(rental => {
      const start = new Date(rental.start_date_time);
      const end = new Date(rental.end_date_time);
      let status = "";

      if (start > now) status = "Upcoming";
      else if (end > now) status = "In Progress";
      else status = "Finalized";

      return { ...rental, status, start, end };
    })
    .sort((a, b) => {
      if (a.status === b.status) {
        if (a.status === "Upcoming") return a.start - b.start;
        if (a.status === "Finalized") return b.end - a.end;
      }
      return (
        ["Upcoming", "In Progress", "Finalized"].indexOf(a.status) -
        ["Upcoming", "In Progress", "Finalized"].indexOf(b.status)
      );
    });

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

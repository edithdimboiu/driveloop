"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getMyRentals from "@/app/services/getMyRentals";
import { useAuth } from "@/app/context/authContext";

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRentals = async () => {
      if (currentUser) {
        const rentals = await getMyRentals();
        setRentals(rentals);
      }
    };
    fetchRentals();
  }, [currentUser]);

  const addRentalToState = newRental => {
    setRentals(prevRentals => [...prevRentals, newRental]);
  };
  const deleteRentalFromState = rentalId => {
    setRentals(prevRentals =>
      prevRentals.filter(rental => rental._id !== rentalId)
    );
  };

  return (
    <RentalsContext.Provider
      value={{
        rentals,
        setRentals,
        deleteRentalFromState,
        addRentalToState,
        currentUser,
      }}
    >
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentalsContext = () => useContext(RentalsContext);

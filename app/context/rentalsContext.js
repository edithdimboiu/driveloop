"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getMyRentals from "@/app/services/getMyRentals";
import { useAuth } from "@/app/context/authContext";

const RentalsContext = createContext();

export const RentalsProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();

  const fetchRentals = async () => {
    if (currentUser) {
      const rentals = await getMyRentals();
      setRentals(rentals);
      setLoading(false);
    }
  };
  useEffect(() => {
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
        loading,
        setRentals,
        deleteRentalFromState,
        addRentalToState,
        fetchRentals,
        currentUser,
      }}
    >
      {children}
    </RentalsContext.Provider>
  );
};

export const useRentalsContext = () => useContext(RentalsContext);

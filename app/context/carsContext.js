"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getMyCars from "@/app/services/getMyCars";
import { useAuth } from "@/app/context/authContext";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      if (currentUser) {
        const cars = await getMyCars();
        setCars(cars);
      }
    };
    fetchCars();
  }, [currentUser]);

  const addCarToState = newCar => {
    setCars(prevCars => [...prevCars, newCar]);
  };
  const deleteCarFromState = carId => {
    setCars(prevCars => prevCars.filter(car => car._id !== carId));
  };
  const updateCarInState = (carId, updatedData) => {
    setCars(prevCars =>
      prevCars.map(car =>
        car._id === carId ? { ...car, ...updatedData } : car
      )
    );
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        setCars,
        deleteCarFromState,
        addCarToState,
        updateCarInState,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => useContext(CarContext);

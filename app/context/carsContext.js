"use client";

import { createContext, useContext, useState, useEffect } from "react";
import getMyCars from "@/app/services/getMyCars";
import { useAuth } from "@/app/context/authContext";
import { useRentalsContext } from "@/app/context/rentalsContext";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { fetchRentals } = useRentalsContext();

  useEffect(() => {
    const fetchCars = async () => {
      if (currentUser) {
        const cars = await getMyCars();
        setCars(cars.filter(car => !car.isDeleted));
        setLoading(false);
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
    const recalculatedCarName = `${updatedData.manufacturer} ${updatedData.model} ${updatedData.year}`;
    setCars(prevCars =>
      prevCars.map(car =>
        car._id === carId
          ? { ...car, ...updatedData, car_name: recalculatedCarName }
          : car
      )
    );
    fetchRentals();
  };

  return (
    <CarContext.Provider
      value={{
        cars,
        loading,
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

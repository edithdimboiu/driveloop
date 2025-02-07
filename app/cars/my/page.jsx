"use client";

import Heading from "@/components/Heading";
import MyCarCard from "@/components/MyCarCard";
import { useCarContext } from "@/app/context/carsContext";
import { useState, useEffect } from "react";

const MyCarsPage = () => {
  const { cars } = useCarContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cars.length > 0) {
      setLoading(false);
    }
  }, [cars]);

  return (
    <>
      <Heading text="My Cars" />
      {loading ? (
        <Heading text="" />
      ) : cars.length > 0 ? (
        cars.map(car => {
          const carKey =
            car._id || `${car.manufacturer}-${car.model}-${car.year}`;
          return <MyCarCard key={carKey} car={car} />;
        })
      ) : (
        <p>You have no car listings.</p>
      )}
    </>
  );
};

export default MyCarsPage;

"use client";

import Heading from "@/components/Heading";
import MyCarCard from "@/components/MyCarCard";
import { useCarContext } from "@/app/context/carsContext";
import { useRentalsContext } from "@/app/context/rentalsContext";
import RestoreDataButton from "@/components/RestoreDataButton";

const MyCarsPage = () => {
  const { cars, loading } = useCarContext();
  const { rentals } = useRentalsContext();

  return (
    <>
      {loading && <Heading text="" />}
      {!loading &&
        (cars.length === 0 ? (
          <Heading text="You have no car listings." />
        ) : (
          <>
            <Heading text="My cars" />

            {cars.map(car => (
              <MyCarCard key={car._id} car={car} rentals={rentals} />
            ))}
          </>
        ))}
      <RestoreDataButton />
    </>
  );
};

export default MyCarsPage;

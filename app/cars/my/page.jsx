"use client";

import Heading from "@/components/Heading";
import MyCarCard from "@/components/MyCarCard";
import { useCarContext } from "@/app/context/carsContext";

const MyCarsPage = () => {
  const { cars } = useCarContext();
  const loading = cars === undefined || cars === null;

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
              <MyCarCard key={car._id} car={car} />
            ))}
          </>
        ))}
    </>
  );
};

export default MyCarsPage;

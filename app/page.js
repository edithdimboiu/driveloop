import CarCard from "@/components/CarCard";
import Heading from "@/components/Heading";
import { getAllCars } from "./services/getAllCars";

export default async function Home() {
  const cars = await getAllCars();

  return (
    <>
      <Heading title="Available cars" />
      {cars.length > 0 ? (
        cars.map(car => <CarCard car={car} key={car.id}></CarCard>)
      ) : (
        <p>No cars available at the moment. Please try again later.</p>
      )}
    </>
  );
}

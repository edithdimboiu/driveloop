import CarCard from "@/components/CarCard";
import Heading from "@/components/Heading";
import { getAllCars } from "./services/getAllCars";

export default async function Home() {
  const cars = await getAllCars();

  return (
    <>
      <section className="bg-white mb-3 px-2 py-2">
        <Heading text="Available cars" />
      </section>
      {cars.length > 0 ? (
        cars.map(car => <CarCard car={car} key={car.id}></CarCard>)
      ) : (
        <p>No cars available at the moment. Please try again later.</p>
      )}
    </>
  );
}

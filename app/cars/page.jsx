import CarCard from "@/components/CarCard";
import Heading from "@/components/Heading";
import { getAllCars } from "../services/getAllCars";

export default async function Cars() {
  const cars = await getAllCars();

  return (
    <>
      <section className="bg-white mb-3 px-2 py-2">
        <Heading text="Available cars" />
      </section>
      {cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map(car => (
            <CarCard car={car} key={car._id} />
          ))}
        </div>
      ) : (
        <p>No cars available at the moment. Please try again later.</p>
      )}
    </>
  );
}

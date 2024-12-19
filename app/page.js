import CarCard from "@/components/CarCard";
import Heading from "@/components/Heading";
import cars from "@/data/cars.json";

export default function Home() {
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

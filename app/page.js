import CarCard from "@/components/CarCard";
import Heading from "@/components/Heading";
import connectDB from "@/config/database";
import Car from "@/models/Car";

export default async function Home() {
  await connectDB();
  const cars = await Car.find({}).lean();

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

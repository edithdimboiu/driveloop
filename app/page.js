import Image from "next/image";
import hero from "@/assets/images/hero.png";
import Link from "next/link";
import Heading from "@/components/Heading";
import { getAllCars } from "@/app/services/getAllCars";

const getRandomCars = (cars, numberOfCars) => {
  return [...cars].sort(() => Math.random() - 0.5).slice(0, numberOfCars);
};

export default async function HomePage() {
  const cars = await getAllCars();
  const randomCars = getRandomCars(cars, 10);
  return (
    <>
      <HeroBanner />
      <TopDeals cars={randomCars} />
      <WhyChooseUs />
      <CallToAction />
    </>
  );
}

const HeroBanner = () => (
  <div className="relative h-[50vh] flex items-center justify-center text-white">
    <Image
      src={hero}
      alt="Car-sharing App"
      fill
      className="brightness-63 object-cover"
    />
    <div className="absolute inset-0 bg-black opacity-35"></div>
    <div className="absolute text-center">
      <h1 className="text-5xl font-bold">Find Your Perfect Ride</h1>
      <p className="text-lg mt-4">
        We have a car for every occasion, from business trips to weekend
        adventures!
      </p>
      <Link
        href="/cars"
        className="bg-blue-500 px-6 py-3 rounded mt-6 inline-block hover:bg-blue-700"
      >
        Explore Cars
      </Link>
    </div>
  </div>
);

const TopDeals = ({ cars }) => (
  <div className="py-16 bg-neutral-100">
    <Heading
      extraClassName="text-4xl text-gray-800 text-center mb-8"
      text="Top Deals"
    />
    <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4">
      {cars.map(car => (
        <div
          key={car._id}
          className="flex-shrink-0 w-[300px] sm:w-[350px] bg-white p-4 rounded-lg shadow-md flex flex-col"
        >
          <div className="relative w-full h-56">
            <Image
              src={`/images/cars/${car.image}`}
              alt={car.car_name}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <div className="flex flex-col flex-grow justify-between">
            <h3 className="text-l font-semibold mt-4">{car.car_name}</h3>
            <p className="text-gray-600 text-sm">
              CHF {car.price_per_hour}/hour
            </p>
            <Link
              href={`/cars/${car._id}`}
              className="block bg-blue-500 text-white py-2 mt-4 text-center rounded hover:bg-blue-700"
            >
              Rent Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      title: "Premium Cars",
      description: "Drive in style with our high-end car collection.",
    },
    {
      title: "Affordable Prices",
      description: "Best rental prices for every budget.",
    },
    {
      title: "Easy Booking",
      description: "Book your ride in just a few clicks.",
    },
    { title: "24/7 Support", description: "We’re here whenever you need us." },
  ];

  return (
    <div className="bg-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">Why Choose DriveLoop?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-12">
        {features.map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CallToAction = () => (
  <div className="bg-blue-500 text-white text-center py-12">
    <h2 className="text-3xl font-bold">Ready to Ride?</h2>
    <p className="text-lg mt-4">Rent your car now and enjoy the road!</p>
    <Link
      href="/cars"
      className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold"
    >
      Browse Cars
    </Link>
  </div>
);

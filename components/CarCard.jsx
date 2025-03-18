import Image from "next/image";
import Link from "next/link";

const CarCard = ({ car }) => {
  return (
    <div
      key={car._id}
      className="bg-white p-4 rounded-lg shadow-xl flex flex-col h-full border
      "
    >
      <div className="relative w-full h-56 mb-4">
        <Image
          src={`/images/cars/${car.image}`}
          alt={car.car_name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow mb-4">
        <h3 className="text-lg font-semibold">{car.car_name}</h3>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-semibold text-gray-800">Address:</span>{" "}
          {car.address}
        </p>
        <p className="text-gray-600 text-sm mb-4">
          <span className="font-semibold text-gray-800">Price:</span> CHF{" "}
          {car.price_per_hour}/hour or CHF {car.price_per_hour * 8}/day
        </p>
        <Link
          href={`/cars/${car._id}`}
          className="block bg-blue-500 text-white py-2 mt-auto text-center rounded hover:bg-blue-700"
        >
          Rent Car
        </Link>
      </div>
    </div>
  );
};

export default CarCard;

import Image from "next/image";
import Link from "next/link";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <Image
          src={`/images/cars/${car.image}`}
          width={600}
          height={150}
          alt={car.car_name}
          className="w-full sm:w-44 sm:h-32 mb-3 sm:mb-0 object-cover rounded-lg"
        />
        <div className="space-y-1">
          <h4 className="text-lg font-semibold">{car.car_name}</h4>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Location:</span>
            {car.location}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Availability:</span>
            {car.availability}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-800"> Price:</span>
            {` CHF ${car.price_per_hour}/ hour or CHF ${
              car.price_per_hour * 8
            }/ day`}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
        <Link
          href={`/cars/${car._id}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Car
        </Link>
      </div>
    </div>
  );
};

export default CarCard;

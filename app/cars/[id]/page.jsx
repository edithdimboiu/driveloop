import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import BookingForm from "@/components/BookingForm";
import connectDB from "@/config/database";
import Car from "@/models/Car";

const CarPage = async ({ params }) => {
  await connectDB();
  const { id } = params;
  const car = await Car.findById(id).lean();
  const carName = `${car.manufacturer} ${car.model} ${car.year}`;

  if (!car) {
    return <Heading title="Car not found"></Heading>;
  }
  return (
    <>
      <section className="bg-white mb-5 shadow px-4 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {carName}
        </h1>
      </section>
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className="inline mr-1" />
          <span className="ml-2">Back to Cars</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            src={`/images/cars/${car.image}`}
            alt={carName}
            width={400}
            height={100}
            className="w-full md:w-1/3 sm:w-1/2 h-68 object-right object-cover rounded-lg"
          />

          <div className="mt-4 sm:mt-0 sm:flex-1">
            <p className="text-gray-600 mb-4">{car.description}</p>

            <ul className="space-y-2 ">
              <li>
                <span className="font-semibold text-gray-800">Features:</span>
                {car.features}
              </li>
              <li>
                <span className="font-semibold text-gray-800">
                  Engine Type:
                </span>
                {car.engine_type}
              </li>
              <li>
                <span className="font-semibold text-gray-800">
                  Availability:
                </span>
                {car.availability}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Price:</span>
                CHF {car.price_per_hour} / hour
              </li>
              <li>
                <span className="font-semibold text-gray-800">Address:</span>
                {car.address}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm />
      </div>
    </>
  );
};

export default CarPage;

import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import BookingForm from "@/components/BookingForm";
import { getCarById } from "@/app/services/getCarById";
import Map from "@/components/Map";
import CarDeleted from "../../../components/CarDeleted";

const CarPage = async ({ params }) => {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    notFound();
  }
  if (car.isDeleted) {
    return <CarDeleted />;
  }

  return (
    <>
      <section className="bg-white mb-5 shadow px-4 py-4">
        <Heading extraClassName="tracking-tight" text={car.car_name} />
      </section>
      <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/cars"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronLeft className="inline mr-1" />
          <span className="ml-2">Back to Cars</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            src={car.image}
            alt={car.car_name}
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
                <span className="font-semibold text-gray-800">Address:</span>{" "}
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    car.address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline relative group"
                >
                  {car.address}
                  <span className="absolute right-0 bottom-full mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1">
                    Open in Google Maps
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <BookingForm car={car} />

        <div className="my-6">
          <h3 className="text-lg font-semibold">Location on the map</h3>
          <Map address={car.address} />
        </div>
      </div>
    </>
  );
};

export default CarPage;

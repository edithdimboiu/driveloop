import Link from "next/link";
import CancelRentalButton from "./CancelRentalButton";

const RentedCarCard = ({ rental }) => {
  const { car_id, car_name, price_per_hour, start_date_time, end_date_time } =
    rental;
  const carId = typeof car_id === "object" ? car_id._id : car_id;

  const formatDate = dateString => {
    const date = new Date(dateString);

    // Get month
    const options = { month: "short" };
    const month = date.toLocaleString("en-US", options, { timeZone: "UTC" });

    // Get day
    const day = date.getUTCDate();

    // Format time in UTC 12-hour
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC",
    };

    const time = date.toLocaleString("en-US", timeOptions);

    // Final formatted string
    return `${month} ${day} at ${time}`;
  };

  const calculateCost = () => {
    const startDate = new Date(start_date_time);
    const endDate = new Date(end_date_time);

    // Total rental hours
    const totalHours = (endDate - startDate) / (1000 * 60 * 60);

    // Cost for rentals of 24 hours the maximum price is 8 * price per hour
    const fullDays = Math.floor(totalHours / 24);
    const fullDayPrice = fullDays * (8 * price_per_hour);

    // Cost for remaining rental hours (under 24)
    const remainingHours = totalHours % 24;
    const remainingPrice = remainingHours * price_per_hour;

    return fullDayPrice + remainingPrice;
  };

  const rentalCost = calculateCost();

  return (
    <div className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <h4 className="text-lg font-semibold">{car_name}</h4>
        <p className="text-sm text-gray-600">
          <strong>Pick Up:</strong> {formatDate(start_date_time)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Drop Off:</strong> {formatDate(end_date_time)}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Rental Cost:</strong> CHF {rentalCost.toFixed(2)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:w-auto mt-2 sm:mt-0">
        <Link
          href={`/cars/${carId}`}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2 mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-blue-700"
        >
          View Car
        </Link>
        <CancelRentalButton rentalId={rental._id} />
      </div>
    </div>
  );
};

export default RentedCarCard;

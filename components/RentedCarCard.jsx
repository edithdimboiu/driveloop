import Link from "next/link";
import RentalActionButton from "./RentalActionButton";
import { calculateRentalCost } from "@/app/utils/rentalCosts";
import StatusBadge from "./StatusBadge";

const RentedCarCard = ({ rental, status, showButtons = true }) => {
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

  const rentalCost = calculateRentalCost(
    start_date_time,
    end_date_time,
    price_per_hour
  );

  const isDisabled = status === "In Progress";

  return (
    <div className=" bg-white shadow-lg border rounded-lg gap-1 p-2 mt-4 sm:p-4 flex flex-row justify-between items-center ">
      <div className={`${showButtons ? "w-3/5" : "w-full"}`}>
        <StatusBadge status={status} />
        <h4 className="text-m m:text-lg font-semibold">{car_name}</h4>

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
      {showButtons && (
        <div className="flex flex-col w-2/5 sm:w-auto justify-self-end sm:flex-row mt-2 sm:mt-0">
          {status !== "Finalized" && (
            <>
              <Link
                href={`/cars/${carId}`}
                className={`bg-blue-500 text-white hover:bg-blue-700 md:px-4 px-2 sm:py-2 py-1 rounded mr-2 mb-2 sm:mb-0 w-full sm:w-auto sm:min-w-[120px] text-center ${
                  isDisabled
                    ? "bg-gray-500 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                View Car
              </Link>
              <RentalActionButton
                rentalId={rental._id}
                isDisabled={isDisabled}
                actionType="cancel"
              />
            </>
          )}
          {status === "Finalized" && (
            <>
              <Link
                href={`/cars/${carId}`}
                className="bg-blue-500 text-white hover:bg-blue-700 md:px-4 px-2 sm:py-2 py-1 rounded mr-2 mb-2 sm:mb-0 w-full sm:w-auto sm:min-w-[120px] text-center"
              >
                Rent Again
              </Link>
              <RentalActionButton
                rentalId={rental._id}
                isDisabled={isDisabled}
                actionType="delete"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RentedCarCard;

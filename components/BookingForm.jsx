"use client";
import rentCar from "@/app/services/rentCar";
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getRentedDates } from "@/app/services/getRentedDates";
import { useRentalsContext } from "@/app/context/rentalsContext";

const BookingForm = ({ car }) => {
  const [state, formAction] = useActionState(rentCar, {});
  const [rentedDates, setRentedDates] = useState([]);
  const [rentedTimes, setRentedTimes] = useState({});
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const router = useRouter();
  const { addRentalToState } = useRentalsContext();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }

    if (state.success) {
      toast.success("Car has been rented!");
      router.push("/rented");
      addRentalToState({
        _id: state.rental_id,
        user_id: state.user_id,
        car_id: state.car_id,
        car_name: car.car_name,
        start_date_time: state.start_date_time,
        end_date_time: state.end_date_time,
      });
    }
  }, [state]);

  useEffect(() => {
    const fetchRentedDates = async () => {
      try {
        const rentedData = await getRentedDates(car._id);
        let datesMap = {};
        let allDates = [];

        rentedData.forEach(({ start_date, end_date }) => {
          let currentDate = new Date(start_date);
          const endDate = new Date(end_date);

          while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split("T")[0];

            if (!datesMap[dateStr]) datesMap[dateStr] = [];
            datesMap[dateStr].push({
              startTime: new Date(start_date).toTimeString().slice(0, 5),
              endTime: new Date(end_date).toTimeString().slice(0, 5),
            });

            allDates.push(dateStr);
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        setRentedDates(allDates);
        setRentedTimes(datesMap);
      } catch (error) {
        console.error("Error fetching rented dates:", error);
      }
    };

    fetchRentedDates();
  }, [car._id]);

  // Check if a date is fully rented
  const isDateFullyRented = dateString => rentedDates.includes(dateString);

  // Check if a time falls within a blocked period
  const isTimeDisabled = (date, time) => {
    if (!rentedTimes[date]) return false;
    return rentedTimes[date].some(
      ({ startTime, endTime }) => time >= startTime && time <= endTime
    );
  };

  // Disable drop-off times before pickup time (if dates are the same)
  const isDropOffTimeDisabled = (date, time) => {
    if (date === pickUpDate && time < pickUpTime) {
      return true; // Prevent selecting a drop-off time before pickup
    }
    return isTimeDisabled(date, time); // Also check existing rentals
  };
  // Find the next available date
  const findNextAvailableDate = dateString => {
    let nextDate = new Date(dateString);

    for (let i = 0; i < 30; i++) {
      // Limit search to 30 days ahead
      nextDate.setDate(nextDate.getDate() + 1);
      let nextDateStr = nextDate.toISOString().split("T")[0];

      if (!isDateFullyRented(nextDateStr)) {
        return nextDateStr; // Return first available date
      }
    }

    return null; // No available dates found
  };
  const isCarInactive = !car.isActive;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Rent this Car</h2>
      {isCarInactive && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-md my-2">
          This car is currently inactive and cannot be rented.
        </div>
      )}
      <form className="mt-4" action={formAction}>
        <input type="hidden" name="car_id" value={car._id}></input>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pick-Up Date
            </label>
            <input
              type="date"
              id="pick_up_date"
              name="pick_up_date"
              value={pickUpDate}
              onChange={e => {
                let selectedDate = e.target.value;

                if (isDateFullyRented(selectedDate)) {
                  const nextAvailable = findNextAvailableDate(selectedDate);

                  if (nextAvailable) {
                    toast.info(
                      `This date is fully booked. First date available: ${nextAvailable}`
                    );
                    setPickUpDate(nextAvailable);
                  } else {
                    toast.error("No available dates in the next 30 days.");
                    setPickUpDate("");
                  }
                } else {
                  setPickUpDate(selectedDate);
                }

                setPickUpTime("");
                setDropOffDate("");
                setDropOffTime("");
              }}
              min={new Date().toISOString().split("T")[0]}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                isDateFullyRented(pickUpDate) ? "bg-red-300" : "border-gray-300"
              }`}
              required
              disabled={isCarInactive}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Pick-Up Time
            </label>
            <input
              type="time"
              id="pick_up_time"
              name="pick_up_time"
              value={pickUpTime}
              onChange={e => {
                const time = e.target.value;
                if (isTimeDisabled(pickUpDate, time)) {
                  toast.error("This time slot is unavailable.");
                  setPickUpTime("");
                } else {
                  setPickUpTime(time);
                }
              }}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={
                isCarInactive || !pickUpDate || isDateFullyRented(pickUpDate)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Drop-Off Date
            </label>
            <input
              type="date"
              id="drop_off_date"
              name="drop_off_date"
              value={dropOffDate}
              onChange={e => {
                setDropOffDate(e.target.value);
                setDropOffTime("");
              }}
              min={pickUpDate || new Date().toISOString().split("T")[0]}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                isDateFullyRented(dropOffDate)
                  ? "bg-red-300"
                  : "border-gray-300"
              }`}
              required
              disabled={isCarInactive || !pickUpDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Drop-Off Time
            </label>
            <input
              type="time"
              id="drop_off_time"
              name="drop_off_time"
              value={dropOffTime}
              onChange={e => {
                const time = e.target.value;
                if (isDropOffTimeDisabled(dropOffDate, time)) {
                  toast.error("Drop-off time must be after pickup time.");
                  setDropOffTime("");
                } else {
                  setDropOffTime(time);
                }
              }}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled={
                isCarInactive || !dropOffDate || isDateFullyRented(dropOffDate)
              }
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-white ${
              pickUpDate &&
              pickUpTime &&
              dropOffDate &&
              dropOffTime &&
              !isDateFullyRented(pickUpDate) &&
              !isDateFullyRented(dropOffDate)
                ? "bg-black hover:bg-gray-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={
              !pickUpDate ||
              !pickUpTime ||
              !dropOffDate ||
              !dropOffTime ||
              isDateFullyRented(pickUpDate) ||
              isDateFullyRented(dropOffDate) ||
              isCarInactive
            }
          >
            Rent Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

"use client";
import rentCar from "@/app/services/rentCar";
import { useEffect, useActionState } from "react";
import { toast } from "react-toastify";

const BookingForm = ({ car }) => {
  const [state, formAction] = useActionState(rentCar, {});

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Car has been rented!");
    }
  }, [state]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Rent this Car</h2>
      <form className="mt-4" action={formAction}>
        <input type="hidden" name="car_id" value={car._id}></input>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="pick_up_date"
              className="block text-sm font-medium text-gray-700"
            >
              Pick-Up Date
            </label>
            <input
              type="date"
              id="pick_up_date"
              name="pick_up_date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="pick_up_time"
              className="block text-sm font-medium text-gray-700"
            >
              Pick-Up Time
            </label>
            <input
              type="time"
              id="pick_up_time"
              name="pick_up_time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="drop_off_date"
              className="block text-sm font-medium text-gray-700"
            >
              Drop-Off Date
            </label>
            <input
              type="date"
              id="drop_off_date"
              name="drop_off_date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="drop_off_time"
              className="block text-sm font-medium text-gray-700"
            >
              Drop-Off Time
            </label>
            <input
              type="time"
              id="drop_off_time"
              name="drop_off_time"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            Rent Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;

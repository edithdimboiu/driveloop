"use server";

import connectDB from "@/config/database";
import Rental from "@/models/Rental";

export async function getRentedDates(carId) {
  try {
    await connectDB();
    const rentals = await Rental.find({ car_id: carId });

    const rentedDates = rentals.map(rental => ({
      start_date: rental.start_date_time,
      end_date: rental.end_date_time,
    }));

    return rentedDates;
  } catch (error) {
    console.error("Error fetching rented dates:", error);
    return [];
  }
}

"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import Rental from "@/models/Rental";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import checkCarAvailability from ".//checkCarAvailability";
import { revalidatePath } from "next/cache";

async function rentCar(previousState, formData) {
  const cookiesInstance = await cookies();
  const sessionCookie = cookiesInstance.get("auth-token");

  if (!sessionCookie) {
    redirect("/login");
  }

  try {
    const decodedToken = jwt.verify(
      sessionCookie.value,
      process.env.JWT_SECRET
    );

    await connectDB();

    const user = await User.findById(decodedToken.id);
    if (!user) {
      redirect("/login");
    }

    // Extract date and time from the formData
    const pickUpDate = formData.get("pick_up_date");
    const pickUpTime = formData.get("pick_up_time");
    const dropOffDate = formData.get("drop_off_date");
    const dropOffTime = formData.get("drop_off_time");
    const carId = formData.get("car_id");

    // Combine date and time
    const start_date_time = new Date(`${pickUpDate}T${pickUpTime}`);
    const end_date_time = new Date(`${dropOffDate}T${dropOffTime}`);

    const isAvailable = await checkCarAvailability(
      carId,
      start_date_time,
      end_date_time
    );
    console.log(isAvailable);
    if (!isAvailable) {
      return {
        error: "Car is not available for the selected dates.",
      };
    }

    const newRental = {
      user_id: user._id.toString(),
      car_id: carId.toString(),
      start_date_time: start_date_time,
      end_date_time: end_date_time,
    };
    const rental = new Rental(newRental);
    await rental.save();

    revalidatePath("/rentals", "layout");

    return {
      success: true,
    };
  } catch (error) {
    console.log("Error during car rental:", error);
    return {
      error: "Something went wrong while renting the car.",
    };
  }
}

export default rentCar;

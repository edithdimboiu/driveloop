"use server";
import mongoose from "mongoose";
import connectDB from "@/config/database";
import Rental from "@/models/Rental";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";

export default async function getMyRentals() {
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
    const user = await checkAuth();
    if (!user) {
      redirect("/login");
    }

    const rentals = await Rental.find({
      user_id: new mongoose.Types.ObjectId(`${decodedToken.id}`),
    })
      .populate("car_id") // Populate the car details
      .lean();
    return rentals.map(rental => {
      const car = rental.car_id;

      return {
        ...rental,
        _id: rental._id.toString(),
        user_id: rental.user_id.toString(),
        car_id: car?._id?.toString(),
        car_name: car?.car_name,
      };
    });
  } catch (error) {
    console.log("Failed to get user rentals", error);
    return { error: "Something went wrong while fetching rentals." };
  }
}

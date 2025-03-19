"use server";

import connectDB from "@/config/database";
import Car from "@/models/Car";

export async function getAllCars() {
  try {
    await connectDB();
    const cars = await Car.find({ isActive: true, isDeleted: false }).lean();
    return cars;
  } catch (error) {
    console.log("Failed to get cars", error);
    throw new Error("Could not fetch cars");
  }
}

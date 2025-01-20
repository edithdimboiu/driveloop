"use server";

import connectDB from "@/config/database";
import Car from "@/models/Car";

export async function getCarById(id) {
  try {
    await connectDB();
    const car = await Car.findById(id).lean();
    return car;
  } catch (error) {
    console.log("Failed to get car.", error);
    throw new Error("Car not found.");
  }
}

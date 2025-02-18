"use server";

import connectDB from "@/config/database";
import Car from "@/models/Car";
import { notFound } from "next/navigation";

export async function getCarById(id) {
  try {
    await connectDB();
    const car = await Car.findById(id).lean();
    if (!car) {
      notFound();
    }
    return {
      ...car,
      _id: car._id.toString(),
      user_id: car.user_id.toString(),
    };
  } catch (error) {
    console.log("Failed to get car.", error);
    notFound();
  }
}

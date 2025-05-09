"use server";

import connectDB from "@/config/database";
import Car from "@/models/Car";
import Rental from "@/models/Rental";
import demoCars from "@/data/cars.json";
import demoRentals from "@/data/rentals.json";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function restoreData() {
  try {
    await connectDB();
    const processData = (data, isRental = false) => {
      return data.map(item => {
        let processedItem = {
          ...item,
          _id: new mongoose.Types.ObjectId(`${item._id.$oid}`),
          user_id: new mongoose.Types.ObjectId(`${item.user_id.$oid}`),
          updatedAt: new Date(item.updatedAt.$date),
        };

        if (isRental) {
          processedItem = {
            ...processedItem,
            _id: new mongoose.Types.ObjectId(`${item._id.$oid}`),
            car_id: new mongoose.Types.ObjectId(`${item.car_id.$oid}`),
            start_date_time: new Date(item.start_date_time.$date),
            end_date_time: new Date(item.end_date_time.$date),
            createdAt: new Date(item.createdAt.$date),
          };
        }

        return processedItem;
      });
    };

    const cars = processData(demoCars);
    const rentals = processData(demoRentals, true);

    await Promise.all([Car.deleteMany({}), Rental.deleteMany({})]);

    await Promise.all([Car.insertMany(cars), Rental.insertMany(rentals)]);
    revalidatePath("/rented");
    revalidatePath("/cars/my");

    return { success: true };
  } catch (error) {
    console.error("Restore error:", error);
    return { success: false, error: "Failed to restore data." };
  }
}

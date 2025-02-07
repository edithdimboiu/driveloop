"use server";
import mongoose from "mongoose";
import connectDB from "@/config/database";
import Car from "@/models/Car";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function getMyCars() {
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

    const cars = await Car.find({
      user_id: new mongoose.Types.ObjectId(`${decodedToken.id}`),
    });
    return cars.map(car => ({
      ...car.toObject(),
      _id: car._id.toString(),
      user_id: car.user_id.toString(),
    }));
  } catch (error) {
    console.log("Failed to get cars", error);
    redirect("/error");
  }
}

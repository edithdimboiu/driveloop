"use server";

import Car from "@/models/Car";

export async function updateCarStatus(carId, isActive) {
  try {
    const car = await Car.findByIdAndUpdate(
      carId,
      { isActive },
      { new: true }
    ).lean();

    if (!car) {
      throw new Error("Car not found");
    }

    return {
      success: true,
      _id: car._id.toString(),
      isActive: car.isActive,
    };
  } catch (error) {
    console.error("Error updating car status:", error);
    throw new Error("Failed to update car status");
  }
}

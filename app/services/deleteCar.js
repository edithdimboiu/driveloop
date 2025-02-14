"use server";
import path from "path";
import Car from "@/models/Car";
import fs from "fs";
import { getRentedDates } from "./getRentedDates";
import { revalidatePath } from "next/cache";

async function deleteCar(carId) {
  try {
    const carToDelete = await Car.findById(carId);

    if (!carToDelete) {
      return { error: "Car not found" };
    }
    // Get rental dates for all users
    const rentedDates = await getRentedDates(carId);

    // Sort rental dates descending
    const sortedRentals = rentedDates.sort(
      (a, b) => new Date(b.end_date) - new Date(a.end_date)
    );

    // Check if there is an active or future rental for this car
    const isRented = sortedRentals.find(
      rental => new Date(rental.end_date) >= new Date()
    );

    if (isRented) {
      return {
        error: `Car cannot be deleted because it's rented until ${new Date(
          isRented.end_date
        ).toLocaleDateString()}.`,
      };
    }

    const imagePath = path.join(
      process.cwd(),
      "public",
      "images",
      "cars",
      carToDelete.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Car.findByIdAndDelete(carId);
    revalidatePath("/cars/my", "page");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred while deleting the car" };
  }
}

export default deleteCar;

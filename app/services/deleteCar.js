"use server";
import path from "path";
import Car from "@/models/Car";
import fs from "fs";
import { revalidatePath } from "next/cache";

async function deleteCar(carId) {
  try {
    const carToDelete = await Car.findById(carId);

    if (!carToDelete) {
      return { error: "Car not found" };
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

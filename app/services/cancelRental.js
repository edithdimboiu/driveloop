"use server";
import Rental from "@/models/Rental";
import { revalidatePath } from "next/cache";

async function cancelRental(rentalId) {
  try {
    const rentalToCancel = await Rental.findById(rentalId);

    if (!rentalToCancel) {
      return { error: "Rental not found" };
    }

    await Rental.findByIdAndDelete(rentalId);
    revalidatePath("/rented", "page");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error occurred while canceling the rental" };
  }
}

export default cancelRental;

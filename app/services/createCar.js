"use server";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import Car from "@/models/Car.js";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary";

async function createCar(previousState, formData) {
  const { user } = await checkAuth();

  if (!user) {
    return {
      error: "You must be logged in to add a car",
    };
  }

  // Handling file upload
  let imageUrl;
  const image = formData.get("image");

  try {
    imageUrl = await uploadImageToCloudinary(image);
  } catch (error) {
    return {
      error: "Error uploading image to Cloudinary",
    };
  }

  const manufacturer = formData.get("manufacturer");
  const model = formData.get("model");
  const year = parseInt(formData.get("year"), 10);
  const description = formData.get("description");
  const engineType = formData.get("engine-type");
  const location = formData.get("location");
  const address = formData.get("address");
  const features = formData.get("features");
  const availability = formData.get("availability");
  const pricePerHour = parseFloat(formData.get("price-per-hour"));
  const minimumRentalDuration = parseInt(
    formData.get("minimum-rental-duration"),
    10
  );
  const maximumRentalDuration = parseInt(
    formData.get("maximum-rental-duration"),
    10
  );
  const isActive = formData.get("isActive") === "on" ? true : false;

  if (minimumRentalDuration > maximumRentalDuration) {
    return {
      error: "Minimum rental duration cannot exceed maximum rental duration",
    };
  }

  try {
    const newCar = new Car({
      user_id: user.id,
      manufacturer,
      model,
      year,
      description,
      engine_type: engineType,
      location,
      address,
      features,
      availability,
      price_per_hour: pricePerHour,
      minimum_rental_duration: minimumRentalDuration,
      maximum_rental_duration: maximumRentalDuration,
      image: imageUrl,
      isActive,
    });

    await newCar.save();

    revalidatePath("/", "layout");

    return {
      success: true,
      carId: newCar._id.toString(),
      car_name: newCar.car_name,
      manufacturer: newCar.manufacturer,
      model: newCar.model,
      year: newCar.year,
      description: newCar.description,
      engine_type: newCar.engine_type,
      location: newCar.location,
      address: newCar.address,
      features: newCar.features,
      availability: newCar.availability,
      price_per_hour: newCar.price_per_hour,
      minimum_rental_duration: newCar.minimum_rental_duration,
      maximum_rental_duration: newCar.maximum_rental_duration,
      image: newCar.image,
      isActive: newCar.isActive,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.message || "An unexpected error has occured";
    return {
      error: errorMessage,
    };
  }
}

export default createCar;

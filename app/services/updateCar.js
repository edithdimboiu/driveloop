"use server";
import checkAuth from "./checkAuth";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
import Car from "@/models/Car";
import { v4 as uuidv4 } from "uuid";

export default async function updateCar(previousState, formData) {
  const carId = formData.get("carId");
  console.log("Received car ID:", carId);

  const { user } = await checkAuth();

  if (!user) {
    return { error: "You must be logged in to update a car" };
  }
  const car = await Car.findById(carId);
  if (!car) {
    throw new Error("Car not found");
  }
  const oldImagePath = car.image;
  // Handling file upload for image update
  let imagePath;
  const image = formData.get("image");

  try {
    imagePath = await saveImage(image, oldImagePath);
    if (imagePath === null) {
      imagePath = oldImagePath; // Keep the old image if a new one is not uploaded
    }
  } catch (error) {
    return { error: "Error saving image locally" };
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

  if (minimumRentalDuration > maximumRentalDuration) {
    return {
      error: "Minimum rental duration cannot exceed maximum rental duration",
    };
  }

  const updatedFields = {};

  // Compare data introduced in the edit page with the existing data
  if (car.manufacturer !== manufacturer)
    updatedFields.manufacturer = manufacturer;
  if (car.model !== model) updatedFields.model = model;
  if (car.year !== year) updatedFields.year = year;
  if (car.description !== description) updatedFields.description = description;
  if (car.engine_type !== engineType) updatedFields.engine_type = engineType;
  if (car.location !== location) updatedFields.location = location;
  if (car.address !== address) updatedFields.address = address;
  if (car.features !== features) updatedFields.features = features;
  if (car.availability !== availability)
    updatedFields.availability = availability;
  if (car.price_per_hour !== pricePerHour)
    updatedFields.price_per_hour = pricePerHour;
  if (car.minimum_rental_duration !== minimumRentalDuration)
    updatedFields.minimum_rental_duration = minimumRentalDuration;
  if (car.maximum_rental_duration !== maximumRentalDuration)
    updatedFields.maximum_rental_duration = maximumRentalDuration;
  if (car.image !== imagePath) updatedFields.image = imagePath;
  updatedFields.car_name = `${manufacturer} ${model} ${year}`;

  if (Object.keys(updatedFields).length === 0) {
    return { error: "No changes were made" };
  }

  try {
    const car = await Car.findByIdAndUpdate(carId, updatedFields, {
      new: true,
    }).lean();
    revalidatePath("/", "layout");
    revalidatePath("/cars/my", "layout");
    revalidatePath("/rented", "layout");

    return {
      success: true,
      carId: car._id.toString(),
      car_name: car.car_name,
      manufacturer: car.manufacturer,
      model: car.model,
      year: car.year,
      description: car.description,
      engine_type: car.engine_type,
      location: car.location,
      address: car.address,
      features: car.features,
      availability: car.availability,
      price_per_hour: car.price_per_hour,
      minimum_rental_duration: car.minimum_rental_duration,
      maximum_rental_duration: car.maximum_rental_duration,
      image: car.image,
    };
  } catch (error) {
    console.log(error);
    return { error: "An unexpected error has occurred" };
  }
}

async function saveImage(image, oldImagePath) {
  const fsPromises = fs.promises;
  if (!image || image.size === 0 || image.name === "undefined") return null;

  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const imageExtension = path.extname(image.name).toLowerCase();

  if (!allowedExtensions.includes(imageExtension)) {
    throw new Error("Only JPG, JPEG, and PNG files are allowed");
  }

  if (image.size > 5 * 1024 * 1024) {
    throw new Error("Image size should not exceed 5MB");
  }

  // Delete the old image if a new one is uploaded when editing the car
  if (oldImagePath) {
    const oldImageFilePath = path.join(
      process.cwd(),
      "public",
      "images",
      "cars",
      oldImagePath
    );
    try {
      await fsPromises.unlink(oldImageFilePath);
    } catch (error) {
      console.error("Error deleting old image:", error);
    }
  }

  const uniqueImageName = `car-${uuidv4()}${imageExtension}`;
  const uploadPath = path.join(
    process.cwd(),
    "public",
    "images",
    "cars",
    uniqueImageName
  );

  const buffer = await image.arrayBuffer();
  await fsPromises.writeFile(uploadPath, Buffer.from(buffer));

  return uniqueImageName;
}

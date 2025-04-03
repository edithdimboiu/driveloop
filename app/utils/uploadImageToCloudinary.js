import path from "path";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/config/cloudinary";

export default async function uploadImageToCloudinary(
  image,
  oldImagePath = null
) {
  if (!image || image.size === 0 || image.name === "undefined") return null;

  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const imageExtension = path.extname(image.name).toLowerCase();

  if (!allowedExtensions.includes(imageExtension)) {
    throw new Error("Only JPG, JPEG, and PNG files are allowed");
  }

  if (image.size > 5 * 1024 * 1024) {
    throw new Error("Image size should not exceed 5MB");
  }

  // Delete the old image from Cloudinary if a new one is uploaded
  if (oldImagePath) {
    const publicId = path.basename(oldImagePath, path.extname(oldImagePath));
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Error deleting old image from Cloudinary:", error);
    }
  }

  try {
    const buffer = await image.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          public_id: `car_images/${uuidv4()}`,
          folder: "driveloop",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(imageBuffer);
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
}

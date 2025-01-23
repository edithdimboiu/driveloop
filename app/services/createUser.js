"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

async function createUser(previousState, formData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");

  if (!username || !name || !password) {
    return {
      error: "Please fill in all fields",
    };
  }

  if (password.length < 5) {
    return {
      error: "Password must be at least 5 characters long",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return {
        error: "This username already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Registration Error:", error);
    return {
      error: "Could not register user",
    };
  }
}

export default createUser;

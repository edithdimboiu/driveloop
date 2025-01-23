"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

async function createSession(previousState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  if (!username || !password) {
    return {
      error: "Please fill out all fields.",
    };
  }
  try {
    await connectDB();
    const user = await User.findOne({ username });

    if (!user) {
      return {
        error: "Invalid credentials.",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        error: "Invalid credentials.",
      };
    }

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 3600 * 1000),
      path: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Authentication Error:", error);
    return {
      error: "Something went wrong.",
    };
  }
}

export default createSession;

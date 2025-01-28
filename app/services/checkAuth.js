"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

async function checkAuth() {
  const cookiesInstance = await cookies();
  const sessionCookie = cookiesInstance.get("auth-token");
  if (!sessionCookie) {
    return {
      isAuthenticated: false,
    };
  }

  try {
    const decodedToken = jwt.verify(
      sessionCookie.value,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return {
        isAuthenticated: false,
      };
    }

    return {
      isAuthenticated: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
      },
    };
  } catch (error) {
    console.error("Error during authentication:", error);
    return {
      isAuthenticated: false,
    };
  }
}

export default checkAuth;

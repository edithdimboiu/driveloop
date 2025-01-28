"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

async function destroySession() {
  const cookiesInstance = await cookies();
  const sessionCookie = cookiesInstance.get("auth-token");
  if (!sessionCookie) {
    return {
      error: "No session cookie found",
    };
  }
  try {
    const token = sessionCookie.value;
    const cookiesInstance = await cookies();
    cookiesInstance.set("auth-token", "", { maxAge: -1 });
    jwt.verify(token, process.env.JWT_SECRET);

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: "Couldn't  delete session.",
    };
  }
}

export default destroySession;

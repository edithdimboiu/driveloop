import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request) {
  const cookiesInstance = await cookies();
  const sessionCookie = cookiesInstance.get("auth-token");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rented", "/cars/add", "/cars/my"],
};

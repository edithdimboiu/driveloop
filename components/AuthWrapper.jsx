"use client";
import { AuthProvider } from "@/app/context/authContext";

const AuthWrapper = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthWrapper;

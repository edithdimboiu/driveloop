"use client";

import Heading from "@/components/Heading";
import InputField from "@/components/InputField";
import AuthFormActions from "@/components/AuthFormActions";
import createSession from "../services/createSession";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

const LoginPage = () => {
  const [state, formAction] = useActionState(createSession, {});
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success("Logged in successfully!");
      setIsAuthenticated(true);
      setInterval(() => router.push("/"), 2000);
    }
  }, [state]);
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mt-20">
        <form action={formAction}>
          <Heading extraClassName="text-center mb-6" text="Login" />
          <InputField id="username"></InputField>
          <InputField containerMargin="mb-6" id="password" type="password" />
          <AuthFormActions
            buttonText="Login"
            linkText="No account?"
            linkHref="/register"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

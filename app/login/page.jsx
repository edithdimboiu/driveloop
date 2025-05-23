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
  const { setIsAuthenticated, setCurrentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
    if (state.success) {
      toast.success("Logged in successfully!");
      setIsAuthenticated(true);
      setCurrentUser(state.user);
      router.push("/cars");
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
        <div className="text-center text-sm text-gray-600 mt-4">
          <p className="font-semibold">For Demo version:</p>
          <p>
            username: <span className="text-blue-500">user</span>
          </p>
          <p>
            password: <span className="text-blue-500">password</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

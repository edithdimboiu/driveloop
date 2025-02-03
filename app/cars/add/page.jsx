"use client";

import AddCarForm from "@/components/AddCarForm";
import Heading from "@/components/Heading";
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createCar from "@/app/services/createCar";

const AddCarPage = () => {
  const [state, formAction] = useActionState(createCar, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Car added successfully!");
      router.push("/");
    }
  }, [state]);

  return (
    <>
      <Heading text="Add car"></Heading>
      <AddCarForm action={formAction} />
    </>
  );
};

export default AddCarPage;

"use client";

import AddCarForm from "@/components/AddCarForm";
import Heading from "@/components/Heading";
import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createCar from "@/app/services/createCar";
import { useCarContext } from "@/app/context/carsContext";

const AddCarPage = () => {
  const [state, formAction] = useActionState(createCar, {});
  const { addCarToState } = useCarContext();
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Car added successfully!");
      router.push("/");
      addCarToState({
        _id: state.carId,
        car_name: state.car_name,
        manufacturer: state.manufacturer,
        model: state.model,
        year: state.year,
        description: state.description,
        engine_type: state.engine_type,
        location: state.location,
        address: state.address,
        features: state.features,
        availability: state.availability,
        price_per_hour: state.price_per_hour,
        minimum_rental_duration: state.minimum_rental_duration,
        maximum_rental_duration: state.maximum_rental_duration,
        image: state.image,
        isActive: state.isActive,
      });
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

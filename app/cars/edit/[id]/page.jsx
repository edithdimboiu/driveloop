"use client";
import AddCarForm from "@/components/AddCarForm";
import Heading from "@/components/Heading";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useActionState } from "react";
import { useCarContext } from "@/app/context/carsContext";
import { getCarById } from "@/app/services/getCarById";
import updateCar from "@/app/services/updateCar";

const EditCarPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [carData, setCarData] = useState();
  const [state, formAction] = useActionState(updateCar, {});
  const { updateCarInState } = useCarContext();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const car = await getCarById(id);
        setCarData(car);
      } catch (error) {
        toast.error("Failed to load car data.");
      }
    };

    fetchCarData();
  }, [id]);

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Car updated successfully!");
      updateCarInState(state.carId, {
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
      });
      router.push("/cars/my");
    }
  }, [state]);

  if (!carData) return <p>Loading...</p>;

  return (
    <>
      <Heading text="Edit car" />
      <AddCarForm action={formAction} carData={carData} />
    </>
  );
};

export default EditCarPage;

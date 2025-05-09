"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import restoreData from "@/app/services/restoreData";
import { useTransition } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { FaRedo } from "react-icons/fa";
import { useRentalsContext } from "@/app/context/rentalsContext";
import { useCarContext } from "@/app/context/carsContext";

const RestoreDataButton = () => {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setIsRestoredRentals } = useRentalsContext();
  const { setIsRestoredCars } = useCarContext();

  const handleRestore = async () => {
    startTransition(async () => {
      const result = await restoreData();

      if (result.success) {
        toast.success("Demo data restored!");
        setIsRestoredRentals(true);
        setIsRestoredCars(true);
      } else {
        toast.error(result.error || "Something went wrong.");
      }
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isPending}
          className="bg-red-500 text-white mt-8 px-4 py-2 rounded hover:bg-red-600"
        >
          {isPending ? (
            "Restoring..."
          ) : (
            <>
              <FaRedo className="inline mr-2" /> Restore Demo Data
            </>
          )}
        </button>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleRestore}
        title="Confirm Restore"
        message="Are you sure you want to restore initial data? This action cannot be undone."
      />
    </>
  );
};

export default RestoreDataButton;

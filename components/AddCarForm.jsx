import InputField from "./InputField";
import { useState } from "react";

const AddCarForm = ({ action, carData = {} }) => {
  const [image, setImage] = useState(carData.image);
  const [isNewImageRequired, setIsNewImageRequired] = useState(!image); // Check if image is required or not

  const handleFileChange = event => {
    const file = event.target.files[0];
    setImage(file);
    setIsNewImageRequired(false);
  };
  const isEditing = Object.keys(carData).length > 0;

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <form action={action}>
          {isEditing && (
            <input type="hidden" name="carId" value={carData._id} />
          )}
          {!isEditing && <IsActiveCheckbox carData={carData} />}

          <InputField id="manufacturer" defaultValue={carData.manufacturer} />
          <InputField id="model" defaultValue={carData.model} />
          <InputField
            id="year"
            type="number"
            min="1990"
            max={new Date().getFullYear()}
            step="1"
            defaultValue={carData.year}
          />
          <Description carData={carData} />
          <DropdownList carData={carData} />
          <InputField id="location" defaultValue={carData.location} />
          <InputField id="address" defaultValue={carData.address} />
          <InputField id="features" defaultValue={carData.features} />
          <InputField id="availability" defaultValue={carData.availability} />
          <InputField
            id="price-per-hour"
            type="number"
            min="20"
            max="1000"
            step="0.5"
            defaultValue={carData.price_per_hour}
          />
          <p className="mb-2">All our prices are in CHF.</p>

          <InputField
            id="minimum-rental-duration"
            type="number"
            min="1"
            step="1"
            defaultValue={carData.minimum_rental_duration}
          />
          <InputField
            id="maximum-rental-duration"
            type="number"
            min="2"
            max="72"
            step="1"
            defaultValue={carData.maximum_rental_duration}
          />
          <p className="mb-2">Please introduce rental durations in hours.</p>

          <InputField
            containerMargin="mb-8"
            id="image"
            type="file"
            required={isNewImageRequired} // Required only if there is no image available
            onChange={handleFileChange}
          />

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCarForm;

const Description = ({ carData }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="description"
        className="block text-gray-700 font-bold mb-2"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="border rounded w-full h-24 py-2 px-3"
        placeholder="Enter a description for the car"
        required
        defaultValue={carData.description}
      ></textarea>
    </div>
  );
};

const DropdownList = ({ carData }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="engine-type"
        className="block text-gray-700 font-bold mb-2"
      >
        Engine Type
      </label>
      <select
        id="engine-type"
        name="engine-type"
        defaultValue={carData.engine_type}
        className="border rounded w-full py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select engine type</option>
        <option value="Electric">Electric</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Diesel">Diesel</option>
        <option value="Gasoline">Gasoline</option>
      </select>
    </div>
  );
};

const IsActiveCheckbox = ({ carData }) => {
  return (
    <div className="mb-4">
      <label htmlFor="isActive" className="block text-gray-700 font-bold mb-2">
        Is your car available for renting?
      </label>
      <input
        type="checkbox"
        id="isActive"
        name="isActive"
        defaultChecked={carData.isActive}
      />
    </div>
  );
};

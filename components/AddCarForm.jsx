import InputField from "./InputField";

const AddCarForm = ({ action }) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <form action={action}>
          <IsActiveCheckbox />

          <InputField id="manufacturer" />
          <InputField id="model" />
          <InputField
            id="year"
            type="number"
            min="1990"
            max={new Date().getFullYear()}
            step="1"
          />
          <Description />
          <DropdownList />
          <InputField id="location" />
          <InputField id="address" />
          <InputField id="features" />
          <InputField id="availability" />
          <InputField
            id="price-per-hour"
            type="number"
            min="20"
            max="1000"
            step="0.5"
          />
          <p className="mb-2">All our prices are in CHF.</p>

          <InputField
            id="minimum-rental-duration"
            type="number"
            min="1"
            step="1"
          />
          <InputField
            id="maximum-rental-duration"
            type="number"
            min="2"
            max="72"
            step="1"
          />
          <p className="mb-2">Please introduce rental durations in hours.</p>

          <InputField containerMargin="mb-8" id="image" type="file" />

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

const Description = () => {
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
      ></textarea>
    </div>
  );
};

const DropdownList = () => {
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

const IsActiveCheckbox = () => {
  return (
    <div className="mb-4">
      <label htmlFor="isActive" className="block text-gray-700 font-bold mb-2">
        Is your car available for renting?
      </label>
      <input
        type="checkbox"
        id="isActive"
        name="isActive"
        defaultChecked={true}
      />
    </div>
  );
};

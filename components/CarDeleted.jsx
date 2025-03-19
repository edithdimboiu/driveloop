import React from "react";
import Link from "next/link";

const CarDeleted = () => {
  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-2xl font-semibold mb-4">Sorry</h1>
      <p className="text-lg text-gray-600">
        The car you are looking for is no longer part of our fleet.
      </p>
      <Link
        href="/cars"
        className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Browse Cars
      </Link>
    </div>
  );
};

export default CarDeleted;

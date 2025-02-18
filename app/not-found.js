"use client";
import Link from "next/link";
import Heading from "@/components/Heading";

const Custom404 = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-white flex items-center justify-center z-10">
      <div className="text-center p-8 bg-white rounded-lg max-w-3xl w-full">
        <Heading
          extraClassName="text-3xl text-gray-800 font-bold"
          text="Oops! Page Not Found"
        />
        <p className="text-xl text-gray-600 mt-4">
          It seems like the page you're looking for doesn't exist. But don't
          worry, we can get you back on track!
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Custom404;

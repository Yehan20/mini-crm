import React from "react";
import { Link } from "react-router";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="p-6 w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      {/* Icon */}
      <div className="mx-auto mb-6 flex items-center justify-center rounded-full bg-gray-200 p-6">
        <HiOutlineExclamationCircle className="h-16 w-16 text-gray-500" />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="cursor-pointer rounded-lg bg-gray-50 px-6 py-3 hover:bg-gray-100 transition font-medium text-gray-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;

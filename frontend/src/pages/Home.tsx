import React from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className=" pt-6 w-full max-w-6xl mx-auto">
      {/* Intro Text */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Use the options below to manage your companies and employees quickly and easily.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create Company Card */}
        <Link
          to="/companies/create"
          className="cursor-pointer rounded-lg bg-gray-50 py-8 px-5 hover:bg-gray-100 transition"
        >
          <div className="mx-auto mb-4 flex items-center justify-center rounded-md h-[100px] bg-gray-200 p-4">
            <HiOutlineBuildingOffice2 className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-1">
            Create Company
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Add a new company and manage its details like logo, name, and website.
          </p>
        </Link>

        {/* Create Employee Card */}
        <Link
          to="/employees/create"
          className="cursor-pointer rounded-lg bg-gray-50 py-8 px-5 hover:bg-gray-100 transition"
        >
          <div className="mx-auto mb-4 flex items-center justify-center rounded-md h-[100px] bg-gray-200 p-4">
            <FaUserAlt className="h-8 w-8 text-gray-500" />
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-800 mb-1">
            Create Employee
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Add a new employee and assign them to a company.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

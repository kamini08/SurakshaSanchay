'use client';

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

type FormDataType = {
  name: string;
  email: string;
  phoneNumber: string;
  policeStation: string;
  designation: string;
  governmentId: string;
  password: string;
};

const policeStations = [
  { name: "TT Nagar Police Station", lat: 23.23725, long: 77.39984 },
  { name: "Kamla Nagar Police Station", lat: 23.21554, long: 77.39552 },
  { name: "Shyamla Hills Police Station", lat: 23.2457, long: 77.4107 },
  { name: "Habibganj Police Station", lat: 23.2295, long: 77.4381 },
  { name: "Piplani Police Station", lat: 23.2289, long: 77.4718 },
  { name: "Govindpura Police Station", lat: 23.2587, long: 77.4935 },
  { name: "Ashoka Garden Police Station", lat: 23.2494, long: 77.4631 },
  { name: "MP Nagar Police Station", lat: 23.2332, long: 77.4272 },
  { name: "Bhopal Kotwali Police Station", lat: 23.2689, long: 77.4012 },
  { name: "Hanumanganj Police Station", lat: 23.2812, long: 77.4135 },
  { name: "Chhola Mandir Police Station", lat: 23.2856, long: 77.4343 },
  { name: "Shahpura Police Station", lat: 23.1945, long: 77.4423 },
  { name: "Misrod Police Station", lat: 23.1734, long: 77.4802 },
  { name: "Kolar Police Station", lat: 23.1678, long: 77.4187 },
  { name: "Jahangirabad Police Station", lat: 23.2635, long: 77.4273 },
  { name: "Mangalwara Police Station", lat: 23.2721, long: 77.4224 },
  { name: "Talaiya Police Station", lat: 23.2685, long: 77.4152 },
  { name: "Ayodhya Nagar Police Station", lat: 23.2467, long: 77.4823 },
  { name: "Bagh Sewania Police Station", lat: 23.2118, long: 77.4756 },
  { name: "Khajuri Sadak Police Station", lat: 23.1245, long: 77.5712 },
  { name: "Ratibad Police Station", lat: 23.1101, long: 77.3865 },
  { name: "Berasia Police Station", lat: 23.6352, long: 77.4323 },
];

const designations = ["Admin", "Incharge", "User"];

const Register = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phoneNumber: "",
    policeStation: "",
    designation: "",
    governmentId: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Failed to register. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="REGISTER" />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          />
        </div>

        {/* Location Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Location (Police Station)
          </label>
          <select
            name="policeStation"
            value={formData.policeStation}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          >
            <option value="" disabled>
              Select a police station
            </option>
            {policeStations.map((station, index) => (
              <option key={index} value={station.name}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        {/* Designation Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Designation
          </label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          >
            <option value="" disabled>
              Select a designation
            </option>
            {designations.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Government ID Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Government ID
          </label>
          <input
            type="text"
            name="governmentId"
            placeholder="Enter your government ID"
            value={formData.governmentId}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-black dark:text-white mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-opacity-90"
          >
            Submit
          </button>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default Register;

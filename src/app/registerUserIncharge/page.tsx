'use client';
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

type FormDataType = {
  email: string;
  password: string;
  phoneNumber: string;
  policeStation: string;
  resume: File | null; // File or null for the resume field
  additionalInfo: string;
};

const policeStations = [
  { name: "TT Nagar Police Station", lat: 23.23725, long: 77.39984 },
  { name: "Kamla Nagar Police Station", lat: 23.21554, long: 77.39552 },
  { name: "Shyamla Hills Police Station", lat: 23.2457, long: 77.4107 },
  { name: "Habibganj Police Station", lat: 23.2295, long: 77.4381 },
  { name: "Piplani Police Station", lat: 23.2289, long: 77.4718 },
  // (other police stations omitted for brevity)
];

const FormElements = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
    phoneNumber: "",
    policeStation: "",
    resume: null,
    additionalInfo: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("phoneNumber", formData.phoneNumber);
    form.append("policeStation", formData.policeStation);
    if (formData.resume) {
      form.append("resume", formData.resume);
    }
    form.append("additionalInfo", formData.additionalInfo);

    try {
      const response = await fetch("https://your-backend-api.com/submit", {
        method: "POST",
        body: form,
      });
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Form Elements" />
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Email Address
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
        </div>

        <div className="flex flex-col gap-9">
          {/* Police Station Dropdown */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Police Station
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

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Upload Resume
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
              required
            />
          </div>

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-black dark:text-white mb-2">
              Additional Information
            </label>
            <textarea
              name="additionalInfo"
              placeholder="Tell us more about yourself"
              rows={6}
              value={formData.additionalInfo}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-stroke px-4 py-2 dark:border-strokedark dark:bg-boxdark"
            />
          </div>
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

export default FormElements;

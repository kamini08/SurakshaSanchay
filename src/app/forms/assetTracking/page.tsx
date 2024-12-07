"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const AddItemLocationForm = () => {
  // State management for form fields
  const [itemLocationData, setItemLocationData] = useState({
    itemId: "",
    govId: "",
    assignedDate: "",
    location: "",
    description: "",
    status: "In", // Default status
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // New state for message type (success or error)

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/asset/item-location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemLocationData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Item location added successfully!");
        setMessageType("success"); // Set message type to success
        // Reset form after successful submission
        setItemLocationData({
          itemId: "",
          govId: "",
          assignedDate: "",
          location: "",
          description: "",
          status: "In", // Reset to default
        });
      } else {
        setMessage(`Error: ${result.error}`);
        setMessageType("error"); // Set message type to error
      }

      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage("An error occurred while adding the item location.");
      setMessageType("error"); // Set message type to error

      // Hide the message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setItemLocationData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ADD ITEM LOCATION" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
              {/* Form Fields */}
              {[
                {
                  name: "itemId",
                  label: "Item ID",
                  type: "text",
                  required: true,
                },
                {
                  name: "govId",
                  label: "Gov ID",
                  type: "text",
                  required: true,
                },
                {
                  name: "assignedDate",
                  label: "Assigned Date",
                  type: "datetime-local",
                  required: true,
                },
                {
                  name: "location",
                  label: "Location",
                  type: "text",
                  required: true,
                },
                {
                  name: "status",
                  label: "Status",
                  type: "dropdown",
                  options: ["In", "Out"], // Dropdown options
                  required: true,
                },
                {
                  name: "description",
                  label: "Description (Optional)",
                  type: "textarea",
                  required: false,
                },
              ].map(({ name, label, type, options = [], required }) => (
                <div key={name}>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label} {required && <span className="text-meta-1">*</span>}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      placeholder={`Enter ${label}`}
                      value={
                        itemLocationData[name as keyof typeof itemLocationData]
                      }
                      onChange={handleChange}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  ) : type === "dropdown" ? (
                    <select
                      name={name}
                      value={
                        itemLocationData[name as keyof typeof itemLocationData]
                      }
                      onChange={handleChange}
                      required={required}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    >
                      <option value="">Select {label}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={type}
                      name={name}
                      placeholder={`Enter ${label}`}
                      value={
                        itemLocationData[name as keyof typeof itemLocationData]
                      }
                      onChange={handleChange}
                      required={required}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  )}
                </div>
              ))}

              {/* Submit Button */}
              <div className="col-span-full flex justify-end">
                <button
                  type="submit"
                  className="rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                >
                  Add Item Location
                </button>
              </div>
            </div>
          </form>

          {/* Message Display */}
          {message && (
            <p
              className={`p-6.5 text-center ${messageType === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddItemLocationForm;

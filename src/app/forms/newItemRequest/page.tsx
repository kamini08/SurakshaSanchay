"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// Define the structure of form data
interface ItemRequestFormData {
  item: string;
  category: string;
  quantity: number;
  condition: string;
  description: string;
  technicalSpecifications: string;

  location: string;
  expectedDeliveryDate: string;
  purpose: string;
  expectedUsageDuration: string;
  requesterName: string;
  department: string;
  approvalNeededBy: string;
  priorityLevel: string;
}

const NewItemRequest = () => {
  // State for the form
  const [itemRequestFormData, setItemRequestFormData] =
    useState<ItemRequestFormData>({
      item: "",
      category: "",
      quantity: 1,
      condition: "new",
      description: "",
      technicalSpecifications: "",
      location: "",
      expectedDeliveryDate: "",
      purpose: "",
      expectedUsageDuration: "",
      requesterName: "John Doe", // Replace with dynamic user data if needed
      department: "",
      approvalNeededBy: "",
      priorityLevel: "medium", // Default value
    });

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setItemRequestFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/item-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemRequestFormData),
      });

      if (response.ok) {
        alert("Item request submitted successfully!");
        setItemRequestFormData({
          item: "",
          category: "",
          quantity: 1,
          condition: "new",
          description: "",
          technicalSpecifications: "",
          location: "",
          expectedDeliveryDate: "",
          purpose: "",
          expectedUsageDuration: "",
          requesterName: "John Doe", // Reset to default or fetched value
          department: "",
          approvalNeededBy: "",
          priorityLevel: "medium",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting item request form:", error);
      alert("Failed to submit the item request.");
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="NEW ITEM REQUEST FORM" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
              {/* Standard Fields */}
              {[
                {
                  name: "item",
                  label: "Item Name/Type",
                  type: "text",
                  required: true,
                },
                {
                  name: "category",
                  label: "Category",
                  type: "dropdown",
                  required: true,
                  options: [
                    "Communication Device",
                    "Computer and IT Equipment",
                    "Networking Equipment",
                    "Surveillance and Tracking",
                    "Vehicle and Accessories",
                    "Protective Gear",
                    "Firearm",
                    "Forensic Equipment",
                    "Medical First Aid",
                    "Office Supply",
                  ],
                },
                {
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
                  required: true,
                },
                {
                  name: "condition",
                  label: "Condition",
                  type: "dropdown",
                  options: ["New", "Refurbished"],
                  required: true,
                },
                { name: "description", label: "Description", type: "textarea" },
                {
                  name: "technicalSpecifications",
                  label: "Technical Specifications",
                  type: "textarea",
                },

                {
                  name: "location",
                  label: "Location",
                  type: "text",
                  required: true,
                },
                {
                  name: "expectedDeliveryDate",
                  label: "Expected Delivery Date",
                  type: "date",
                  required: true,
                },
                {
                  name: "purpose",
                  label: "Purpose/Use Case",
                  type: "textarea",
                  required: true,
                },
                {
                  name: "expectedUsageDuration",
                  label: "Expected Usage Duration",
                  type: "text",
                },
                {
                  name: "requesterName",
                  label: "Requester Name",
                  type: "text",
                  required: true,
                },
                {
                  name: "department",
                  label: "Department",
                  type: "dropdown",
                  options: [
                    "Logistics",
                    "Operations",
                    "IT",
                    "Administration",
                    "Security",
                  ],
                  required: true,
                },
                {
                  name: "approvalNeededBy",
                  label: "Approval Needed By",
                  type: "date",
                  required: true,
                },
                {
                  name: "priorityLevel",
                  label: "Priority Level",
                  type: "dropdown",
                  options: ["Urgent", "Not Urgent"],
                  required: true,
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
                        itemRequestFormData[
                          name as keyof ItemRequestFormData
                        ] as string
                      }
                      onChange={handleChange}
                      required={required}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  ) : type === "dropdown" ? (
                    <select
                      name={name}
                      value={
                        itemRequestFormData[
                          name as keyof ItemRequestFormData
                        ] as string
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
                        itemRequestFormData[
                          name as keyof ItemRequestFormData
                        ] as string
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
                  Submit Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItemRequest;

"use client";

import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from "react-toastify";

// Define the structure of form data
interface ItemRequestFormData {
  item: string;
  category: string;
  quantity: number;
  description: string;
  expectedDeliveryDate: string;
  purpose: string;
  expectedUsageDuration: string;
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
      quantity: 0,
      description: "",
      expectedDeliveryDate: "",
      purpose: "",
      expectedUsageDuration: "",
      department: "",
      approvalNeededBy: "",
      priorityLevel: "", // Default value
    });
    const [userId, setUserId] = useState<string>("role");


    

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
      const res = await fetch("/api/Role", {
        method: "GET",
      });
      const role = await res.json();

      if (role == "user") {
        const response = await fetch("/api/inventory/issuance/user/request", {
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
            quantity: 0,
            description: "",
            expectedDeliveryDate: "",
            purpose: "",
            expectedUsageDuration: "",
            department: "",
            approvalNeededBy: "",
            priorityLevel: "",
          });
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      } else {
        const response = await fetch(
          "/api/inventory/issuance/incharge/request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemRequestFormData),
          },
        );

        if (response.ok) {
          alert("Item request submitted successfully!");
          setItemRequestFormData({
            item: "",
            category: "",
            quantity: 0,
            description: "",
            expectedDeliveryDate: "",
            purpose: "",
            expectedUsageDuration: "",
            department: "",
            approvalNeededBy: "",
            priorityLevel: "",
          });
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
        }
      }
    } catch (error) {
      console.error("Error submitting item request form:", error);
      // alert("Failed to submit the item request.");
      toast.error("Error submitting item request form!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ISSUE ITEM REQUEST FORM" />

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
                // {
                //   name: "userId",
                //   label: "User Id",
                //   value: userId,
                  
                //   type: "text",
                //   required: true,
                // },
                {
                  name: "category",
                  label: "Category",
                  type: "dropdown",
                  required: true,
                  options: [
                    "Communication Devices",
                    "Computer and IT Equipment",
                    "Networking Equipment",
                    "Surveillance and Tracking",
                    "Vehicle and Accessories",
                    "Protective Gear",
                    "Firearms",
                    "Forensic Equipment",
                    "Medical First Aid",
                    "Office Supplies",
                  ],
                },
                {
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
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

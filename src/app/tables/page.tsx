"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

// Define the structure of return form data
interface ItemReturnFormData {
  returnId: string;
  userId: string;
  userName: string;
  equipmentId: string;
  equipmentName: string;
  returnDate: string;
  condition: string;
  returnLocation: string | null;
  issueId: string | null;
  reasonForReturn: string | null;
  staffId: string | null;
  returnConfirmed: boolean;
  penalty: number | null;
  notes: string | null;
  returnMethod: string;
}

const ItemReturnForm = () => {
  // State for the form
  const [itemReturnFormData, setItemReturnFormData] = useState<ItemReturnFormData>({
    returnId: "",
    userId: "",
    userName: "John Doe", // Replace with dynamic user data if needed
    equipmentId: "",
    equipmentName: "",
    returnDate: "",
    condition: "good", // Default condition
    returnLocation: null,
    issueId: null,
    reasonForReturn: null,
    staffId: null,
    returnConfirmed: false,
    penalty: null,
    notes: null,
    returnMethod: "In-Person", // Default method
  });

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setItemReturnFormData((prev) => ({
      ...prev,
      [name]: value, // Update the form state with the input value
    }));
  };

  // Submit the form and POST data to the backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/item-returns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemReturnFormData),
      });

      if (response.ok) {
        alert("Item return submitted successfully!");
        // Reset form data after successful submission
        setItemReturnFormData({
          returnId: "",
          userId: "",
          userName: "John Doe", // Reset to default or fetched value
          equipmentId: "",
          equipmentName: "",
          returnDate: "",
          condition: "good",
          returnLocation: null,
          issueId: null,
          reasonForReturn: null,
          staffId: null,
          returnConfirmed: false,
          penalty: null,
          notes: null,
          returnMethod: "In-Person",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting item return form:", error);
      alert("Failed to submit the item return.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ITEM RETURN FORM" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Form Fields */}
              {[
                { name: "returnId", label: "Return ID", type: "text", required: true },
                { name: "userId", label: "User ID", type: "text", required: true },
                { name: "userName", label: "User Name", type: "text", required: true },
                { name: "equipmentId", label: "Equipment ID", type: "text", required: true },
                { name: "equipmentName", label: "Equipment Name", type: "text", required: true },
                { name: "returnDate", label: "Return Date", type: "date", required: true },
                { name: "condition", label: "Condition", type: "dropdown", options: ["Good", "Damaged"], required: true },
                { name: "returnLocation", label: "Return Location", type: "text" },
                { name: "issueId", label: "Issue ID (if any)", type: "text" },
                { name: "reasonForReturn", label: "Reason for Return", type: "textarea" },
                { name: "staffId", label: "Handled by Staff ID", type: "text" },
                { name: "penalty", label: "Penalty (if applicable)", type: "number" },
                { name: "notes", label: "Additional Notes", type: "textarea" },
                { name: "returnMethod", label: "Return Method", type: "dropdown", options: ["In-Person", "Courier"], required: true },
              ].map(({ name, label, type, options = [], required }) => (
                <div key={name}>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label} {required && <span className="text-meta-1">*</span>}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      placeholder={`Enter ${label}`}
                      value={itemReturnFormData[name as keyof ItemReturnFormData] as string}
                      onChange={handleChange}
                      required={required}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  ) : type === "dropdown" ? (
                    <select
                      name={name}
                      value={itemReturnFormData[name as keyof ItemReturnFormData] as string}
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
                      value={itemReturnFormData[name as keyof ItemReturnFormData] as string}
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
                  Submit Return
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ItemReturnForm;

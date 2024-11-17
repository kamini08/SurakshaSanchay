// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// const NewItemRequestForm = () => {
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="New Item Request" />

//       <div className="grid grid-cols-1 gap-9">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//           {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//             <h3 className="font-medium text-black dark:text-white">
//               New Item Request Form
//             </h3>
//           </div> */}

//           <form action="#">
//             <div className="p-6.5">
//               {/* Item Name */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Item Name/Type
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter item name/type"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                 />
//               </div>

//               {/* Category */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Category
//                 </label>
//                 <select
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                 >
//                   <option>Select category</option>
//                   <option>Communication Device</option>
//                   <option>Computer and IT Equipment</option>
//                   <option>Networking Equipment</option>
//                   <option>Surveillance and Tracking</option>
//                   <option>Vehicle and Accessories</option>
//                   <option>Protective Gear</option>
//                   <option>Firearm</option>
//                   <option>Forensic Equipment</option>
//                   <option>Medical First Aid</option>
//                   <option>Office Supply</option>
//                 </select>
//               </div>

//               {/* Quantity */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter quantity"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                   defaultValue={1}
//                 />
//               </div>

//               {/* Condition */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Condition
//                 </label>
//                 <select
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                   defaultValue="new"
//                 >
//                   <option value="new">New</option>
//                   <option value="refurbished">Refurbished</option>
//                 </select>
//               </div>

//               {/* Description */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Description
//                 </label>
//                 <textarea
//                   placeholder="Enter item description"
//                   rows={4}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                 ></textarea>
//               </div>

//               {/* Location */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter location"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                 />
//               </div>

//               {/* Expected Delivery Date */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Expected Delivery Date
//                 </label>
//                 <input
//                   type="date"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                 />
//               </div>

//               {/* Estimated Price */}
//               <div className="mb-4.5">
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Estimated Price per Unit
//                 </label>
//                 <input
//                   type="number"
//                   placeholder="Enter estimated price"
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
//               >
//                 Submit Request
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default NewItemRequestForm;
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
  brandPreference: string;
  location: string;
  expectedDeliveryDate: string;
  purpose: string;
  issuedTo: string;
  estimatedPricePerUnit: string;
  preferredSupplier: string;
  supplierContactDetails: string;
  maintenanceSchedule: string;
  expectedUsageDuration: string;
  requesterName: string;
  department: string;
  approvalNeededBy: string;
  warrantyPeriod: string;
  assetTag: string;
  priorityLevel: string;
}

const NewItemRequest = () => {
  // State for the form
  const [itemRequestFormData, setItemRequestFormData] = useState<ItemRequestFormData>({
    item: "",
    category: "",
    quantity: 1,
    condition: "new",
    description: "",
    technicalSpecifications: "",
    brandPreference: "",
    location: "",
    expectedDeliveryDate: "",
    purpose: "",
    issuedTo: "",
    estimatedPricePerUnit: "",
    preferredSupplier: "",
    supplierContactDetails: "",
    maintenanceSchedule: "",
    expectedUsageDuration: "",
    requesterName: "John Doe", // Replace with dynamic user data if needed
    department: "",
    approvalNeededBy: "",
    warrantyPeriod: "",
    assetTag: "",
    priorityLevel: "medium", // Default value
  });

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setItemRequestFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "estimatedPricePerUnit" ? Number(value) : value,
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
          brandPreference: "",
          location: "",
          expectedDeliveryDate: "",
          purpose: "",
          issuedTo: "",
          estimatedPricePerUnit: "",
          preferredSupplier: "",
          supplierContactDetails: "",
          maintenanceSchedule: "",
          expectedUsageDuration: "",
          requesterName: "John Doe", // Reset to default or fetched value
          department: "",
          approvalNeededBy: "",
          warrantyPeriod: "",
          assetTag: "",
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
    <DefaultLayout>
      <Breadcrumb pageName="NEW ITEM REQUEST FORM" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
            <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Standard Fields */}
              {[
                { name: "item", label: "Item Name/Type", type: "text", required: true },
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
                { name: "quantity", label: "Quantity", type: "number", required: true },
                { name: "condition", label: "Condition", type: "dropdown", options: ["New", "Refurbished"], required: true },
                { name: "description", label: "Description", type: "textarea" },
                { name: "technicalSpecifications", label: "Technical Specifications", type: "textarea" },
                { name: "brandPreference", label: "Model/Brand Preference", type: "text" },
                { name: "location", label: "Location", type: "text", required: true },
                { name: "expectedDeliveryDate", label: "Expected Delivery Date", type: "date", required: true },
                { name: "purpose", label: "Purpose/Use Case", type: "textarea", required: true },
                { name: "issuedTo", label: "Assigned To", type: "text" },
                { name: "estimatedPricePerUnit", label: "Estimated Price per Unit", type: "number", required: true },
                { name: "preferredSupplier", label: "Preferred Supplier", type: "text" },
                { name: "supplierContactDetails", label: "Supplier Contact Details", type: "textarea" },
                { name: "maintenanceSchedule", label: "Maintenance Schedule", type: "textarea" },
                { name: "expectedUsageDuration", label: "Expected Usage Duration", type: "text" },
                { name: "requesterName", label: "Requester Name", type: "text", required: true },
                { name: "department", label: "Department", type: "dropdown", options: ["Logistics", "Operations", "IT", "Administration", "Security"], required: true },
                { name: "approvalNeededBy", label: "Approval Needed By", type: "date", required: true },
                { name: "warrantyPeriod", label: "Warranty Period", type: "text" },
                { name: "assetTag", label: "Asset Tag (if applicable)", type: "text" },
                { name: "priorityLevel", label: "Priority Level", type: "dropdown", options: ["Low", "Medium", "High"], required: true },
              ].map(({ name, label, type, options = [], required }) => (
                <div key={name}>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    {label} {required && <span className="text-meta-1">*</span>}
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      name={name}
                      placeholder={`Enter ${label}`}
                      value={itemRequestFormData[name as keyof ItemRequestFormData] as string}
                      onChange={handleChange}
                      required={required}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  ) : type === "dropdown" ? (
                    <select
                      name={name}
                      value={itemRequestFormData[name as keyof ItemRequestFormData] as string}
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
                      value={itemRequestFormData[name as keyof ItemRequestFormData] as string}
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
    </DefaultLayout>
  );
};

export default NewItemRequest;

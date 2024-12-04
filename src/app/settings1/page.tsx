// "use client";

// import { useState } from "react";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

// const RequestManagement = () => {
//   // State for Maintenance Request Form
//   const [maintenanceFormData, setMaintenanceFormData] = useState({
//     itemId: "",
//     item: "",
//     user: "",
//     userId: "",
//     technicianId: "",
//     requestDate: "",
//     status: "PENDING", // Default value
//     issueDescription: "",
//     resolutionDetails: "",
//     discardReason: "",
//     approvalDate: "",
//     completionDate: "",
//   });

//   // Handle field changes for Maintenance Request
//   const handleMaintenanceChange = (  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

//     const { name, value } = e.target;
//     setMaintenanceFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit Maintenance Request Form
//   const handleMaintenanceSubmit = async (e:React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/maintenance-requests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(maintenanceFormData),
//       });

//       if (response.ok) {
//         alert("Maintenance request submitted successfully!");
//         setMaintenanceFormData({
//           itemId: "",
//           item: "",
//           user: "",
//           userId: "",
//           requestDate: "",
//           technicianId: "",
//           status: "PENDING",
//           issueDescription: "",
//           resolutionDetails: "",
//           discardReason: "",
//           approvalDate: "",
//           completionDate: "",
//         });
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error submitting maintenance form:", error);
//       alert("Failed to submit the maintenance request.");
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="MAINTENANCE REQUEST FORM" />

//       {/* Full-Width Maintenance Request Form */}
//       <div className="flex flex-col gap-9">
//         <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

//           <form onSubmit={handleMaintenanceSubmit}>
//             <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
//               {/* Item */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Item <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="item"
//                   placeholder="Enter Item"
//                   value={maintenanceFormData.item}
//                   onChange={handleMaintenanceChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Item ID */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Item ID <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="itemId"
//                   placeholder="Enter Item ID"
//                   value={maintenanceFormData.itemId}
//                   onChange={handleMaintenanceChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* User */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   User <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="user"
//                   placeholder="Enter User"
//                   value={maintenanceFormData.user}
//                   onChange={handleMaintenanceChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* User ID */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   User ID <span className="text-meta-1">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   name="userId"
//                   placeholder="Enter User ID"
//                   value={maintenanceFormData.userId}
//                   onChange={handleMaintenanceChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Technician ID */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Technician ID (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   name="technicianId"
//                   placeholder="Enter Technician ID"
//                   value={maintenanceFormData.technicianId}
//                   onChange={handleMaintenanceChange}
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 />
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                   Status <span className="text-meta-1">*</span>
//                 </label>
//                 <select
//                   name="status"
//                   value={maintenanceFormData.status}
//                   onChange={handleMaintenanceChange}
//                   required
//                   className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                 >
//                   <option value="PENDING">PENDING</option>
//                   <option value="APPROVED">APPROVED</option>
//                   <option value="REJECTED">REJECTED</option>
//                   <option value="COMPLETED">COMPLETED</option>
//                   <option value="DISCARDED">DISCARDED</option>
//                 </select>
//               </div>

//                {/* Issue Description */}
//                <div className="col-span-1 mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Issue Description <span className="text-meta-1">*</span>
//                   </label>
//                   <textarea
//                     name="issueDescription"
//                     rows={4}
//                     placeholder="Describe the Issue"
//                     value={maintenanceFormData.issueDescription}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   ></textarea>
//                 </div>

//                 <div className="col-span-1 mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Resolution Description <span className="text-meta-1">*</span>
//                   </label>
//                   <textarea
//                     name="resolutionDetails"
//                     rows={4}
//                     placeholder="Describe the Resolution Details"
//                     value={maintenanceFormData.resolutionDetails}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   ></textarea>
//                 </div>

//                {/* Request Date */}
//                <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Request Date <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="requestDate"
//                     value={maintenanceFormData.requestDate}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Approval Date <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="approvalDate"
//                     value={maintenanceFormData.approvalDate}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Completion Date <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="completionDate"
//                     value={maintenanceFormData.completionDate}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* <div className="col-span-1 mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Discard Reason <span className="text-meta-1">*</span>
//                   </label>
//                   <textarea
//                     name="discardReason"
//                     rows={4}
//                     placeholder="Describe the Discard Reason"
//                     value={maintenanceFormData.discardReason}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   ></textarea>
//                 </div> */}

//               {/* Submit Button */}
//               <div className="col-span-full flex justify-end">
//                 <button
//                   type="submit"
//                   className="w-half  rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
//                 >
//                   Submit Maintenance Request
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default RequestManagement;
"use client";

<<<<<<< HEAD
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
  expectedUsageDuration: string;
  requesterName: string;
  department: string;
  approvalNeededBy: string;
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
    expectedUsageDuration: "",
    requesterName: "John Doe", // Replace with dynamic user data if needed
    department: "",
    approvalNeededBy: "",
    priorityLevel: "medium", // Default value
  });

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
=======
// "use client";
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import dynamic from "next/dynamic"; // for dynamic import of the QR reader
// import "tailwindcss/tailwind.css";

// const QrReader = dynamic(() => import("react-qr-barcode-scanner"), {
//   ssr: false,
// });

// const ScanQR = () => {
//   const [scanResult, setScanResult] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleScan = async (result: any) => {
//     if (result?.text) {
//       setScanResult(result.text);
//       try {
//         const response = await fetch(`/api/getItem?itemId=${result.text}`);
//         const data = await response.json();
//         if (response.ok) {
//           router.push(`/itemDetails?itemId=${data.itemId}`);
//         } else {
//           setError('Item not found');
//         }
//       } catch (error) {
//         setError('Error fetching item details');
//       }
//     }
//   };

//   const handleError = (err: any) => {
//     setError('Failed to scan QR code');
//     console.error(err);
// };

//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100"></div>
//   );
// };

// export default ScanQR;
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
      brandPreference: "",
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
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
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
          brandPreference: "",
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
    <DefaultLayout>
      <Breadcrumb pageName="NEW ITEM REQUEST FORM" />

      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleSubmit}>
<<<<<<< HEAD
            <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Standard Fields */}
              {[
                { name: "item", label: "Item Name/Type", type: "text", required: true },
=======
            <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
              {/* Standard Fields */}
              {[
                {
                  name: "item",
                  label: "Item Name/Type",
                  type: "text",
                  required: true,
                },
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
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
<<<<<<< HEAD
                { name: "quantity", label: "Quantity", type: "number", required: true },
=======
                {
                  name: "quantity",
                  label: "Quantity",
                  type: "number",
                  required: true,
                },
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
                {
                  name: "condition",
                  label: "Condition",
                  type: "dropdown",
                  options: ["New", "Refurbished"],
                  required: true,
                },
                { name: "description", label: "Description", type: "textarea" },
<<<<<<< HEAD
                { name: "technicalSpecifications", label: "Technical Specifications", type: "textarea" },
                { name: "brandPreference", label: "Model/Brand Preference", type: "text" },
                { name: "location", label: "Location", type: "text", required: true },
                { name: "expectedDeliveryDate", label: "Expected Delivery Date", type: "date", required: true },
                { name: "purpose", label: "Purpose/Use Case", type: "textarea", required: true },
                { name: "expectedUsageDuration", label: "Expected Usage Duration", type: "text" },
                { name: "requesterName", label: "Requester Name", type: "text", required: true },
=======
                {
                  name: "technicalSpecifications",
                  label: "Technical Specifications",
                  type: "textarea",
                },
                {
                  name: "brandPreference",
                  label: "Model/Brand Preference",
                  type: "text",
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
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
                {
                  name: "department",
                  label: "Department",
                  type: "dropdown",
<<<<<<< HEAD
                  options: ["Logistics", "Operations", "IT", "Administration", "Security"],
                  required: true,
                },
                { name: "approvalNeededBy", label: "Approval Needed By", type: "date", required: true },
=======
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
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
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
<<<<<<< HEAD
                      value={itemRequestFormData[name as keyof ItemRequestFormData] as string}
=======
                      value={
                        itemRequestFormData[
                          name as keyof ItemRequestFormData
                        ] as string
                      }
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
                      onChange={handleChange}
                      required={required}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  ) : type === "dropdown" ? (
                    <select
                      name={name}
<<<<<<< HEAD
                      value={itemRequestFormData[name as keyof ItemRequestFormData] as string}
=======
                      value={
                        itemRequestFormData[
                          name as keyof ItemRequestFormData
                        ] as string
                      }
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
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
<<<<<<< HEAD
                      value={itemRequestFormData[name as keyof ItemRequestFormData] as string}
=======
                      value={
                        itemRequestFormData[
                          name as keyof ItemRequestFormData
                        ] as string
                      }
>>>>>>> cec2cfaed8a38bec51801467b1336e44073661f4
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

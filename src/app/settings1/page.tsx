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

'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'; // for dynamic import of the QR reader
import 'tailwindcss/tailwind.css';

const QrReader = dynamic(() => import('react-qr-barcode-scanner'), {
  ssr: false,
});

const ScanQR = () => {
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleScan = async (result: any) => {
    if (result?.text) {
      setScanResult(result.text);
      try {
        const response = await fetch(`/api/getItem?itemId=${result.text}`);
        const data = await response.json();
        if (response.ok) {
          router.push(`/itemDetails?itemId=${data.itemId}`);
        } else {
          setError('Item not found');
        }
      } catch (error) {
        setError('Error fetching item details');
      }
    }
  };

  const handleError = (err: any) => {
    setError('Failed to scan QR code');
    console.error(err);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Scan QR Code</h1>
      <div className="w-full max-w-lg">
        <QrReader
          onUpdate={(err, result) => {
            if (result) handleScan(result);
            if (err) handleError(err);
          }}
          // style={{ width: '100%' }}
        />
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ScanQR;


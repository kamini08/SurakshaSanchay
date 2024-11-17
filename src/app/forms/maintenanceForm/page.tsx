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

//   // State for Discard Item Request Form
//   const [discardFormData, setDiscardFormData] = useState({
//     itemId: "",
//     userId: "",
//     discardReason: "",
//     status: "PENDING", // Default value
//     approvalDate: "",
//   });

//   // Handle field changes for Maintenance Request
//   const handleMaintenanceChange = (e) => {
//     const { name, value } = e.target;
//     setMaintenanceFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle field changes for Discard Item Request
//   const handleDiscardChange = (e) => {
//     const { name, value } = e.target;
//     setDiscardFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit Maintenance Request Form
//   const handleMaintenanceSubmit = async (e) => {
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

//   // Submit Discard Item Request Form
//   const handleDiscardSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("/api/discard-item-requests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(discardFormData),
//       });

//       if (response.ok) {
//         alert("Discard item request submitted successfully!");
//         setDiscardFormData({
//           itemId: "",
//           userId: "",
//           discardReason: "",
//           status: "PENDING",
//           approvalDate: "",
//         });
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error("Error submitting discard form:", error);
//       alert("Failed to submit the discard item request.");
//     }
//   };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="REQUEST MANAGEMENT" />

//       <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
//         {/* Maintenance Request Form */}
//         <div className="flex flex-col gap-9">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 Maintenance Request Form
//               </h3>
//             </div>

//             <form onSubmit={handleMaintenanceSubmit}>
//               <div className="p-6.5">
//                 {/* Item */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Item  <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="item"
//                     placeholder="Enter Item "
//                     value={maintenanceFormData.item}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Item ID <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="itemId"
//                     placeholder="Enter Item ID"
//                     value={maintenanceFormData.itemId}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* User */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     User <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="user"
//                     placeholder="Enter User"
//                     value={maintenanceFormData.user}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* User ID */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     User ID <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="userId"
//                     placeholder="Enter User ID"
//                     value={maintenanceFormData.userId}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Technician ID (Optional) */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Technician ID (Optional)
//                   </label>
//                   <input
//                     type="text"
//                     name="technicianId"
//                     placeholder="Enter Technician ID"
//                     value={maintenanceFormData.technicianId}
//                     onChange={handleMaintenanceChange}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Status */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Status <span className="text-meta-1">*</span>
//                   </label>
//                   <select
//                     name="status"
//                     value={maintenanceFormData.status}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   >
//                     <option value="PENDING">PENDING</option>
//                     <option value="APPROVED">APPROVED</option>
//                     <option value="REJECTED">REJECTED</option>
//                     <option value="COMPLETED">COMPLETED</option>
//                     <option value="DISCARDED">DISCARDED</option>
//                   </select>
//                 </div>

//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Request Date <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="requestDate"
//                     placeholder="Enter Request Date"
//                     value={maintenanceFormData.requestDate}
//                     onChange={handleMaintenanceChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Issue Description */}
//                 <div className="mb-4.5">
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

//                 {/* Resolution Details (Optional) */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Resolution Details (Optional)
//                   </label>
//                   <textarea
//                     name="resolutionDetails"
//                     rows={4}
//                     placeholder="Enter Resolution Details"
//                     value={maintenanceFormData.resolutionDetails}
//                     onChange={handleMaintenanceChange}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   ></textarea>
//                 </div>

//                 {/* Discard Reason (Optional) */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Discard Reason (Optional)
//                   </label>
//                   <textarea
//                     name="discardReason"
//                     rows={4}
//                     placeholder="Enter Discard Reason"
//                     value={maintenanceFormData.discardReason}
//                     onChange={handleMaintenanceChange}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   ></textarea>
//                 </div>

//                 {/* Approval Date (Optional) */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Approval Date (Optional)
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="approvalDate"
//                     value={maintenanceFormData.approvalDate}
//                     onChange={handleMaintenanceChange}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Completion Date (Optional) */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Completion Date (Optional)
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="completionDate"
//                     value={maintenanceFormData.completionDate}
//                     onChange={handleMaintenanceChange}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
//                 >
//                   Submit Maintenance Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Discard Item Request Form */}
//         <div className="flex flex-col gap-9">
//           <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//             <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
//               <h3 className="font-medium text-black dark:text-white">
//                 Discard Old Item Request Form
//               </h3>
//             </div>

//             <form onSubmit={handleDiscardSubmit}>
//               <div className="p-6.5">
//                 {/* Item ID */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Item ID <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="itemId"
//                     placeholder="Enter Item ID"
//                     value={discardFormData.itemId}
//                     onChange={handleDiscardChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* User ID */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     User ID <span className="text-meta-1">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="userId"
//                     placeholder="Enter User ID"
//                     value={discardFormData.userId}
//                     onChange={handleDiscardChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Discard Reason */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Discard Reason <span className="text-meta-1">*</span>
//                   </label>
//                   <textarea
//                     name="discardReason"
//                     rows={4}
//                     placeholder="Enter Reason for Discarding Item"
//                     value={discardFormData.discardReason}
//                     onChange={handleDiscardChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   ></textarea>
//                 </div>

//                 {/* Status */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Status <span className="text-meta-1">*</span>
//                   </label>
//                   <select
//                     name="status"
//                     value={discardFormData.status}
//                     onChange={handleDiscardChange}
//                     required
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   >
//                     <option value="PENDING">PENDING</option>
//                     <option value="APPROVED">APPROVED</option>
//                     <option value="REJECTED">REJECTED</option>
//                   </select>
//                 </div>

//                 {/* Approval Date (Optional) */}
//                 <div className="mb-4.5">
//                   <label className="mb-3 block text-sm font-medium text-black dark:text-white">
//                     Approval Date (Optional)
//                   </label>
//                   <input
//                     type="datetime-local"
//                     name="approvalDate"
//                     value={discardFormData.approvalDate}
//                     onChange={handleDiscardChange}
//                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
//                 >
//                   Submit Discard Request
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default RequestManagement;
"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const RequestManagement = () => {
  // State for Maintenance Request Form
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    itemId: "",
    item: "",
    user: "",
    userId: "",
    technicianId: "",
    requestDate: "",
    status: "PENDING", // Default value
    issueDescription: "",
    resolutionDetails: "",
    discardReason: "",
    approvalDate: "",
    completionDate: "",
  });

  // Handle field changes for Maintenance Request
  const handleMaintenanceChange = (  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

    const { name, value } = e.target;
    setMaintenanceFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit Maintenance Request Form
  const handleMaintenanceSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/maintenance-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(maintenanceFormData),
      });

      if (response.ok) {
        alert("Maintenance request submitted successfully!");
        setMaintenanceFormData({
          itemId: "",
          item: "",
          user: "",
          userId: "",
          requestDate: "",
          technicianId: "",
          status: "PENDING",
          issueDescription: "",
          resolutionDetails: "",
          discardReason: "",
          approvalDate: "",
          completionDate: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting maintenance form:", error);
      alert("Failed to submit the maintenance request.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="MAINTENANCE REQUEST FORM" />

      {/* Full-Width Maintenance Request Form */}
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          

          <form onSubmit={handleMaintenanceSubmit}>
            <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Item */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="item"
                  placeholder="Enter Item"
                  value={maintenanceFormData.item}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Item ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item ID <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="itemId"
                  placeholder="Enter Item ID"
                  value={maintenanceFormData.itemId}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* User */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  User <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="user"
                  placeholder="Enter User"
                  value={maintenanceFormData.user}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* User ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  User ID <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter User ID"
                  value={maintenanceFormData.userId}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Technician ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Technician ID (Optional)
                </label>
                <input
                  type="text"
                  name="technicianId"
                  placeholder="Enter Technician ID"
                  value={maintenanceFormData.technicianId}
                  onChange={handleMaintenanceChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Status */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Status <span className="text-meta-1">*</span>
                </label>
                <select
                  name="status"
                  value={maintenanceFormData.status}
                  onChange={handleMaintenanceChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="REJECTED">REJECTED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="DISCARDED">DISCARDED</option>
                </select>
              </div>

               {/* Issue Description */}
               <div className="col-span-1 mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Issue Description <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="issueDescription"
                    rows={4}
                    placeholder="Describe the Issue"
                    value={maintenanceFormData.issueDescription}
                    onChange={handleMaintenanceChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                <div className="col-span-1 mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Resolution Description <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="resolutionDetails"
                    rows={4}
                    placeholder="Describe the Resolution Details"
                    value={maintenanceFormData.resolutionDetails}
                    onChange={handleMaintenanceChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

              
               {/* Request Date */}
               <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Request Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="requestDate"
                    value={maintenanceFormData.requestDate}
                    onChange={handleMaintenanceChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Approval Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="approvalDate"
                    value={maintenanceFormData.approvalDate}
                    onChange={handleMaintenanceChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Completion Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="completionDate"
                    value={maintenanceFormData.completionDate}
                    onChange={handleMaintenanceChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                
                {/* <div className="col-span-1 mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Discard Reason <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="discardReason"
                    rows={4}
                    placeholder="Describe the Discard Reason"
                    value={maintenanceFormData.discardReason}
                    onChange={handleMaintenanceChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div> */}

               

       

              {/* Submit Button */}
              <div className="col-span-full flex justify-end">
                <button
                  type="submit"
                  className="w-half  rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                >
                  Submit Maintenance Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RequestManagement;


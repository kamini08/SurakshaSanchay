// 'use client';
// import React, { useEffect, useState } from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// interface IssueItem {
//   requestId: string;
//   itemId: string;
//   category: string;
//   item: string;
//   quantityRequested: number;
//   requestedBy: string;
//   department: string;
//   priorityLevel: string;
//   requestDate: string;
//   status: string;
//   condition: string;
//   availableQuantity: number;
//   returnDate: string | null;
//   remarks: string | null;
//   assetTag: string;
//   supplierDetails: string;
// }

// const defaultData: IssueItem[] = [
//   {
//     requestId: "req12345",
//     itemId: "item98765",
//     category: "IT Equipment",
//     item: "Laptop",
//     quantityRequested: 2,
//     requestedBy: "John Doe",
//     department: "IT",
//     priorityLevel: "High",
//     requestDate: "2024-11-17T10:00:00Z",
//     status: "Pending",
//     condition: "New",
//     availableQuantity: 10,
//     returnDate: null,
//     remarks: null,
//     assetTag: "ASSET123456",
//     supplierDetails: "TechSupplier Co.",
//   },
//   // Additional items can go here...
// ];

// const IssueItemTable = () => {
//   const [issueData, setIssueData] = useState<IssueItem[]>(defaultData);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/issueData");
//         if (response.ok) {
//           const data = await response.json();
//           if (data && data.length > 0) {
//             setIssueData(data);
//           } else {
//             setIssueData(defaultData);
//           }
//         } else {
//           setIssueData(defaultData);
//         }
//       } catch (error) {
//         setIssueData(defaultData);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
//   // Handle Issue button click
//   const handleIssueClick = (index: number): void => {
//     const updatedData = [...issueData];
//     updatedData[index].status = "Issued";
//     setIssueData(updatedData);
//   };

//   // Handle Discard button click
//   const handleDiscardClick = (index: number): void => {
//     const updatedData = [...issueData];
//     updatedData[index].status = "Discarded";
//     setIssueData(updatedData);
//   };

//   return (
//     <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
//       <Breadcrumb pageName="ISSUE ITEMS" />
//       <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//         <div className="max-w-full overflow-x-auto">
//           {loading ? (
//             <p>Loading data...</p>
//           ) : (
//             <table className="w-full table-auto">
//               <thead>
//                 <tr className="bg-gray-2 text-left dark:bg-meta-4">
//                   <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Request Id</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Item Id</th>
//                   <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Category</th>
//                   <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Item</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Quantity Requested</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Requested By</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Department</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Priority Level</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Request Date</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Status</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Condition</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Available Quantity</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Return Date</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Asset Tag</th>
//                   <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Supplier Details</th>
//                   <th className="px-4 py-4 font-medium text-black dark:text-white">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {issueData.map((item, index) => (
//                   <tr key={index}>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.requestId}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.itemId}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.category}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.item}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.quantityRequested}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.requestedBy}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.department}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.priorityLevel}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{new Date(item.requestDate).toLocaleString()}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.status}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.condition}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.availableQuantity}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.returnDate || "N/A"}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.assetTag}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.supplierDetails}</td>
//                     <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
//                     <div className="flex gap-3">
//   <button
//     onClick={() => handleIssueClick(index)}
//     className="bg-green-600 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-md"
//   >
//     Accept
//   </button>
//   <button
//     onClick={() => handleDiscardClick(index)}
//     className="bg-red-600 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-md"
//   >
//     Reject
//   </button>
// </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueItemTable;
"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { toast } from "react-toastify";

interface IssueItem {
  requestId: string;
  itemId: string;
  category: string;
  item: string;
  quantityRequested: number;
  requestedBy: string;
  department: string;
  priorityLevel: string;
  requestDate: string;
  status: string;
  condition: string;
  availableQuantity: number;
}

const defaultData: IssueItem[] = [
  {
    requestId: "",
    itemId: "",
    category: "",
    item: "",
    quantityRequested: 0,
    requestedBy: "",
    department: "",
    priorityLevel: "",
    requestDate: "",
    status: "",
    condition: "",
    availableQuantity: 0,
    returnDate: null,
    remarks: null,
    assetTag: "",
    supplierDetails: "",
  },
  // Additional items can go here...
];

const IssueItemTable = () => {
  const [issueData, setIssueData] = useState<IssueItem[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null); // Notification state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/inventory/issuance/incharge/getRequests",
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setIssueData(data);
          } else {
            setIssueData(defaultData);
          }
        } else {
          setIssueData(defaultData);
        }
      } catch (error) {
        setIssueData(defaultData);
        toast.error("Failed to fetch the data.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Issue button click (Accept Action)
  const handleIssueClick = async (index: number) => {
    const updatedData = [...issueData];
    const item = updatedData[index];

    if (item.availableQuantity >= item.quantityRequested) {
      updatedData[index].status = "Issued"; // Mark as issued
      updatedData[index].availableQuantity -= item.quantityRequested; // Decrease available quantity
      setIssueData(updatedData);
      const response = await fetch(
        "/api/inventory/issuance/incharge/approve/",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...updatedData, isApproved: false }),
        },
      );
      if (!response.ok) {
        toast.error("Failed to reject the request.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      setNotification(
        `Request ${item.requestId} has been accepted and issued.`,
      );
    } else {
      setNotification("Insufficient quantity to fulfill the request.");
    }
  };

  // Handle Discard button click (Reject Action)
  const handleDiscardClick = async (index: number) => {
    const updatedData = [...issueData];
    const rejectedItem = updatedData[index];

    updatedData.splice(index, 1); // Remove the rejected request
    setIssueData({ ...updatedData });
    setNotification(
      `Request ${rejectedItem.requestId} has been rejected and removed.`,
    );
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ISSUE ITEMS" />
      <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full  overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Request Id
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Item Id
                  </th> */}
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Item
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Quantity Requested
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Requested By
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Department
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Priority Level
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Request Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Condition
                  </th> */}
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Available Quantity
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Date
                  </th> */}
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Asset Tag
                  </th> */}
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Supplier Details
                  </th> */}
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {issueData.map((item, index: any) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.requestId}
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.itemId}
                    </td> */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.category}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.item}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.quantityRequested}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.requestedBy}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.department}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.priorityLevel}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {new Date(item.requestDate).toLocaleString()}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.status}
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.condition}
                    </td> */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.availableQuantity}
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.returnDate || "N/A"}
                    </td> */}
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.assetTag}
                    </td> */}
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.supplierDetails}
                    </td> */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleIssueClick(index)}
                          className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-800"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDiscardClick(index)}
                          className="rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-800"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Display the notification message */}
      {notification && (
        <div className="mt-4 rounded-md bg-blue-200 p-4 text-center text-blue-800">
          {notification}
        </div>
      )}
    </div>
  );
};

export default IssueItemTable;

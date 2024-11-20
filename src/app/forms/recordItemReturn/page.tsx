'use client';
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface ItemReturn {
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
  returnStatus: string;
}

const defaultData: ItemReturn[] = [
  {
    returnId: "ret12345",
    userId: "user001",
    userName: "John Doe",
    equipmentId: "equip98765",
    equipmentName: "Laptop",
    returnDate: "2024-11-17T12:00:00Z",
    condition: "Good",
    returnLocation: "Office 101",
    issueId: "iss12345",
    reasonForReturn: "End of loan period",
    staffId: "staff001",
    returnConfirmed: false,
    penalty: 0,
    notes: null,
    returnMethod: "In Person",
    returnStatus: "Pending"
  },
  // Additional item return data can be added here
];

const ItemReturnTable = () => {
  const [returnData, setReturnData] = useState<ItemReturn[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/returnData");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setReturnData(data);
          } else {
            setReturnData(defaultData);
          }
        } else {
          setReturnData(defaultData);
        }
      } catch (error) {
        setReturnData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Confirm Return button click
  const handleConfirmReturnClick = (index: number): void => {
    const updatedData = [...returnData];
    updatedData[index].returnStatus = "Completed"; // Mark return as completed
    updatedData[index].returnConfirmed = true; // Confirm the return
    setReturnData(updatedData);
    setNotification(`Return for ${updatedData[index].equipmentName} has been confirmed.`);
  };

  // Handle Reject Return button click
  const handleRejectReturnClick = (index: number): void => {
    const updatedData = [...returnData];
    const rejectedReturn = updatedData[index];
    updatedData.splice(index, 1); // Remove the rejected return entry
    setReturnData(updatedData);
    setNotification(`Return for ${rejectedReturn.equipmentName} has been rejected.`);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="RETURN ITEMS" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 max-w-full overflow-x-auto">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Return Id</th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">User Name</th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Equipment Name</th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Condition</th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Return Date</th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Return Location</th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">Reason for Return</th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Return Method</th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Penalty</th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Return Status</th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody>
                {returnData.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.returnId}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.userName}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.equipmentName}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.condition}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{new Date(item.returnDate).toLocaleString()}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.returnLocation || "N/A"}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.reasonForReturn || "N/A"}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.returnMethod}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.penalty || "N/A"}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.returnStatus}</td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleConfirmReturnClick(index)}
                          className="bg-green-600 hover:bg-green-800 text-white font-bold px-4 py-2 rounded-md"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleRejectReturnClick(index)}
                          className="bg-red-600 hover:bg-red-800 text-white font-bold px-4 py-2 rounded-md"
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
        <div className="mt-4 p-4 text-center bg-blue-200 text-blue-800 rounded-md">
          {notification}
        </div>
      )}
    </DefaultLayout>
  );
};

export default ItemReturnTable;

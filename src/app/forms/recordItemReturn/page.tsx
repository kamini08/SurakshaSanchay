"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface ItemReturn {
  isLost: boolean;
  isDamaged: boolean;
  itemId: string;
  userId: string;
  name: string;
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
    itemId: "ret12345",
    isDamaged: false,
    isLost: false,
    userId: "user001",
    name: "John Doe",
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
    returnStatus: "Pending",
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
        const response = await fetch("/api/recordItemReturn", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
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
  const handleConfirmReturnClick = async (index: number): Promise<void> => {
    const updatedData = [...returnData];
    console.log(updatedData);
    updatedData[index].returnStatus = "Completed"; // Mark return as completed
    updatedData[index].returnConfirmed = true; // Confirm the return
    try {
      // Make a PATCH request to update the return status in the database
      const response = await fetch("/api/recordItemReturn", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedData[0].itemId, // Send the ID of the return request
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update return status");
      }

      // Update the local state if the request was successful
      updatedData[index].returnStatus = "Completed"; // Mark return as completed
      updatedData[index].returnConfirmed = true; // Confirm the return
      setReturnData(updatedData);
      setNotification(
        `Return for ${updatedData[index].equipmentName} has been confirmed.`,
      );
    } catch (error) {
      console.error(error);
      setNotification("An error occurred while confirming the return.");
    }
  };

  // Handle Reject Return button click
  const handleRejectReturnClick = (index: number): void => {
    const updatedData = [...returnData];
    const rejectedReturn = updatedData[index];
    updatedData.splice(index, 1); // Remove the rejected return entry
    setReturnData(updatedData);
    setNotification(
      `Return for ${rejectedReturn.equipmentName} has been rejected.`,
    );
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="RETURN ITEMS" />
      <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Return Id
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    User Name
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Equipment Name
                  </th>
                  {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Condition
                  </th> */}
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Lost
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Damaged
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Date
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Location
                  </th> */}
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Note
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Method
                  </th> */}
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Penalty
                  </th> */}
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Status
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {returnData.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.itemId}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.name}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.equipmentName}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.isLost.toString()}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.isDamaged.toString()}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {new Date(item.returnDate).toLocaleString()}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.notes}
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.reasonForReturn || "N/A"}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.returnMethod}
                    </td> */}
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.penalty || "N/A"}
                    </td> */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {item.returnStatus}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex gap-3">
                        {returnData[0].returnStatus !== "Completed" ? (
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleConfirmReturnClick(index)}
                              className="rounded-md bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-800"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleRejectReturnClick(index)}
                              className="rounded-md bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-800"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
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

export default ItemReturnTable;

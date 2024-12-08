"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface ItemAssignment {
  id: string;
  itemId: string;
  assignedTo: string[];
  assignedBy: string[];
  assignDates: string[];
  returnDates: string[];
  inchargeIds: string[];
  itemStatus: string[];
  reason: string[];
}

const defaultData: ItemAssignment[] = [
  // Additional item assignment data can be added here
];

const ItemAssignmentTable = () => {
  const [assignmentData, setAssignmentData] =
    useState<ItemAssignment[]>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/auditLogs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAssignmentData(data.length > 0 ? data : defaultData);
        } else {
          setAssignmentData(defaultData);
        }
      } catch (error) {
        setAssignmentData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ITEM ASSIGNMENT HISTORY" />
      <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Item ID
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Assigned To
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Assigned By
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Assign Dates
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Dates
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Incharge IDs
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Item Status
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Reason
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignmentData.map((item) => {
                  const maxLength = Math.max(
                    item.assignedTo.length,
                    item.assignedBy.length,
                    item.assignDates.length,
                    item.returnDates.length,
                    item.inchargeIds.length,
                    item.itemStatus.length,
                    item.reason.length,
                  );

                  const rows = [];
                  for (let i = 0; i < maxLength; i++) {
                    rows.push(
                      <tr key={i}>
                        <td className="px-4 py-2">
                          {i === 0 ? item.itemId : ""}
                        </td>
                        <td className="px-4 py-2">
                          {item.assignedTo[i] || ""}
                        </td>
                        <td className="px-4 py-2">
                          {item.assignedBy[i] || ""}
                        </td>
                        <td className="px-4 py-2">
                          {item.assignDates[i] || ""}
                        </td>
                        <td className="px-4 py-2">
                          {item.returnDates[i] || ""}
                        </td>
                        <td className="px-4 py-2">
                          {item.inchargeIds[i] || ""}
                        </td>
                        <td className="px-4 py-2">
                          {item.itemStatus[i] || ""}
                        </td>
                        <td className="px-4 py-2">{item.reason[i] || ""}</td>
                      </tr>,
                    );
                  }
                  return rows;
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemAssignmentTable;

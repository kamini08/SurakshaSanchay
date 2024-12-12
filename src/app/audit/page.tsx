"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { toast } from "react-toastify";

const CreateItemAssignment = () => {
  const [itemId, setItemId] = useState("");
  const [assignedTo, setAssignedTo] = useState<string[]>([]);
  const [assignedBy, setAssignedBy] = useState<string[]>([]);
  const [assignDates, setAssignDates] = useState<string[]>([]);
  const [returnDates, setReturnDates] = useState<string[]>([]);
  const [inchargeIds, setInchargeIds] = useState<string[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [reason, setReason] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const payload = {
      itemId,
      assignedTo,
      assignedBy,
      assignDates,
      returnDates,
      inchargeIds,
      status,
      reason,
    };

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccessMessage(data.message);
      // Reset form fields if needed
      setItemId("");
      setAssignedTo([]);
      setAssignedBy([]);
      setAssignDates([]);
      setReturnDates([]);
      setInchargeIds([]);
      setStatus([]);
      setReason([]);
    } catch (err: any) {
      setError(err.message);
      toast.error("Something went wrong in audit log", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Audit Form" />
      <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
          Create Item Assignment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Item ID:
              </label>
              <input
                type="text"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Assigned To (comma-separated):
              </label>
              <input
                type="text"
                value={assignedTo.join(", ")}
                onChange={(e) =>
                  setAssignedTo(
                    e.target.value.split(",").map((id) => id.trim()),
                  )
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Assigned By (comma-separated):
              </label>
              <input
                type="text"
                value={assignedBy.join(", ")}
                onChange={(e) =>
                  setAssignedBy(
                    e.target.value.split(",").map((id) => id.trim()),
                  )
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Assign Dates (comma-separated):
              </label>
              <input
                type="text"
                value={assignDates.join(", ")}
                onChange={(e) =>
                  setAssignDates(
                    e.target.value.split(",").map((date) => date.trim()),
                  )
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Return Dates (comma-separated):
              </label>
              <input
                type="text"
                value={returnDates.join(", ")}
                onChange={(e) =>
                  setReturnDates(
                    e.target.value.split(",").map((date) => date.trim()),
                  )
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Incharge IDs (comma-separated):
              </label>
              <input
                type="text"
                value={inchargeIds.join(", ")}
                onChange={(e) =>
                  setInchargeIds(
                    e.target.value.split(",").map((id) => id.trim()),
                  )
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Status:
              </label>
              <input
                type="text"
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value.split(",").map((id) => id.trim()))
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block font-medium text-gray-700 dark:text-gray-300">
                Reason:
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value.split(",").map((id) => id.trim()))
                }
                className="w-full rounded-md border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 p-4 font-medium text-white transition duration-200 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Create Assignment
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CreateItemAssignment;

"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";

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
    }
  };

  return (
    <DefaultLayout>
      <div>
        <h2>Create Item Assignment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Item ID:</label>
            <input
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Assigned To (comma-separated):</label>
            <input
              type="text"
              value={assignedTo.join(", ")}
              onChange={(e) =>
                setAssignedTo(e.target.value.split(",").map((id) => id.trim()))
              }
              required
            />
          </div>
          <div>
            <label>Assigned By (comma-separated):</label>
            <input
              type="text"
              value={assignedBy.join(", ")}
              onChange={(e) =>
                setAssignedBy(e.target.value.split(",").map((id) => id.trim()))
              }
              required
            />
          </div>
          <div>
            <label>Assign Dates (comma-separated):</label>
            <input
              type="text"
              value={assignDates.join(", ")}
              onChange={(e) =>
                setAssignDates(
                  e.target.value.split(",").map((date) => date.trim()),
                )
              }
              required
            />
          </div>
          <div>
            <label>Return Dates (comma-separated):</label>
            <input
              type="text"
              value={returnDates.join(", ")}
              onChange={(e) =>
                setReturnDates(
                  e.target.value.split(",").map((date) => date.trim()),
                )
              }
            />
          </div>
          <div>
            <label>Incharge IDs (comma-separated):</label>
            <input
              type="text"
              value={inchargeIds.join(", ")}
              onChange={(e) =>
                setInchargeIds(e.target.value.split(",").map((id) => id.trim()))
              }
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value.split(",").map((id) => id.trim()))
              }
              required
            />
          </div>
          <div>
            <label>Reason:</label>
            <input
              type="text"
              value={reason}
              onChange={(e) =>
                setReason(e.target.value.split(",").map((id) => id.trim()))
              }
            />
          </div>
          <button type="submit">Create Assignment</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </DefaultLayout>
  );
};

export default CreateItemAssignment;

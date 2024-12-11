"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { toast } from "react-toastify";

interface Request {
  id: string;
  item: string;
  userId: string;
  category: string;
  quantity: number;
  description: string;
  location: string;
  purpose: string;
  expectedUsageDuration: string;
  requesterName: string;
  department: string;
  approvalNeededBy: string;
  priorityLevel: string;
  status?: string;
  reason?: string;
}

const RequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      item: "Laptop",
      userId: "user001",
      category: "Electronics",
      quantity: 2,
      description: "High-performance laptop for software development",
      location: "Office",
      purpose: "Development work",
      expectedUsageDuration: "3 years",
      requesterName: "John Doe",
      department: "IT",
      approvalNeededBy: "2023-12-10",
      priorityLevel: "High",
    },
  ]);

  useEffect(() => {
    // Fetch requests from the backend
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          "/api/inventory/issuance/admin/getRequests",
          {
            method: "GET",
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
          toast.error("Failed to fetch requests,try sometime later", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        const data: any= await response.json();
        console.log(data);
        setRequests(data);
      } catch (err: any) {
        throw new Error("Failed to fetch requests", err);
        toast.error("Failed to fetch requests,try sometime later", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
      }
    };

    fetchRequests();
  }, []);

  const [approvedRequests, setApprovedRequests] = useState<Request[]>([]);
  const [deniedRequests, setDeniedRequests] = useState<Request[]>([]); // New state to store denied requests
  const [showDiscardForm, setShowDiscardForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [discardReason, setDiscardReason] = useState("");

  const handleApprove = async(requestId: string) => {
    const requestToApprove = requests.find((req) => req.id === requestId);
    if (requestToApprove) {
      setRequests(requests.filter((req) => req.id !== requestId));
      setApprovedRequests([
        ...approvedRequests,
        { ...requestToApprove, status: "Approved" },
      ]);
      const response =  await fetch("/api/inventory/issuance/admin/approve", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId: requestId, status: "Approved" }),
      })
      toast.success("Item approved successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDenyClick = async(requestId: string) => {
    const requestToDeny = requests.find((req) => req.id === requestId);
    if (requestToDeny) {
      setSelectedRequest(requestToDeny);
      const response =  await fetch("/api/inventory/issuance/admin/approve", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestId: requestId, status: "Approved" }),
      })
      setShowDiscardForm(true);
    }
  };

  const handleDiscard = () => {
    if (selectedRequest) {
      setRequests(requests.filter((req) => req.id !== selectedRequest.id));
      setDeniedRequests([
        ...deniedRequests,
        { ...selectedRequest, status: "Denied", reason: discardReason },
      ]);
      setShowDiscardForm(false);
      setDiscardReason("");
      toast.warning(`Request "${selectedRequest.item}" has been denied.`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ITEM REQUEST MANAGEMENT" />
      <section>
        {/* Pending Requests */}
        <h1 className="font-medium text-black dark:text-white">
          Pending Requests
        </h1>
        <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                {[
                  "Item",
                  "Quantity",
                  "Category",
                  "Description",
                  "Usage Duration",
                  "Requester Name",
                  "Department",
                  "Approval Needed By",
                  "Priority Level",
                  "Actions",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-4 font-medium text-black dark:text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              
              {requests.length == 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-5 text-center">
                    No pending requests.
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr key={request.id}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.item}
                    </td>
                    
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.quantity}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.category}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.description}
                    </td>
                    
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.expectedUsageDuration}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.requesterName}
                    </td>
                    
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.department}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.approvalNeededBy}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {request.priorityLevel}
                    </td>
                    <td className="border-b my-7 border-[#eee] flex flex-row px-4 py-5 dark:border-strokedark">
                      <button
                        className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="mr-2 rounded bg-red-500 px-4 py-2 text-white"
                        onClick={() => handleDenyClick(request.id)}
                      >
                        Deny
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Approved Requests */}
        {approvedRequests.length > 0 && (
          <section>
            <h1 className="mt-10 font-medium text-black dark:text-white">
              Approved Requests
            </h1>
            <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    {[
                      "Item",
                      "Category",
                      "Request ID",
                      "Status",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-4 font-medium text-black dark:text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {approvedRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.item}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.category}
                      </td>
                      
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.id}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Denied Requests */}
        {deniedRequests.length > 0 && (
          <section>
            <h1 className="mt-10 font-medium text-black dark:text-white">
              Denied Requests
            </h1>
            <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    {[
                      "Item",
                      "Category",
                      "User ID",
                      "Request ID",
                      "Status",
                      "Reason",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="px-4 py-4 font-medium text-black dark:text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deniedRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.item}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.category}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.userId}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.id}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.status}
                      </td>
                      <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        {request.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Deny Form */}
        {showDiscardForm && selectedRequest && (
          <section className="mt-10">
            <h1 className="font-medium text-black dark:text-white">
              Deny Request
            </h1>
            <form
  onSubmit={(e) => {
    e.preventDefault();
    handleDiscard();
  }}
>
  <textarea
    required
    placeholder="Reason for denying (max 100 characters)"
    value={discardReason}
    onChange={(e) => setDiscardReason(e.target.value)}
    maxLength={100} /* Maximum character limit */
    className="w-full mb-2 px-4 py-2 border rounded"
  ></textarea>
  {/* Character Count */}
  <div className="text-sm text-gray-500 mb-4">
    {discardReason.length}/100 characters
  </div>
  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
    Submit
  </button>
  <button
    type="button"
    className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
    onClick={() => setShowDiscardForm(false)}
  >
    Cancel
  </button>
</form>

          </section>
        )}
      </section>
    </div>
  );
};

export default RequestManagement;

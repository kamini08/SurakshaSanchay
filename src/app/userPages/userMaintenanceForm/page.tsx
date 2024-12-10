"use client";
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { toast } from "react-toastify";

const RequestMaitenanceManagement = () => {
  // State for form data and previous records
  const [requestData, setRequestData] = useState({
    itemId: "",
    category: "",
    type: "",
    userId: "",
    userName: "",
    issueDescription: "",
    requestDate: "",
  });

  interface ItemRecord {
    requestId: string;
    itemId: string;
    item: {
      category: string;
      type: string;
    };
    userId: string;
    userName: string;
    issueDescription: string;
    requestDate: string;
    status: string;
    resolutionDetails?: string;
    completionDate?: string;
  }

  const [previousRequests, setPreviousRequests] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviousRequests = async () => {
      setLoading(true);

      // Replace with the actual user ID (e.g., from authentication context or props)
      try {
        const response = await fetch("/api/maintenance/userRequest");
        if (response.ok) {
          const data = await response.json();
          setPreviousRequests(data || []);
        } else {
          console.error("Failed to load previous requests.");
        }
      } catch (error) {
        console.error("Error fetching previous requests:", error);
        toast.error("Error fetching previous requests", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousRequests();
  }, []);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setRequestData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/maintenance/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        // alert("Request submitted successfully!");
        toast.success("Request submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setRequestData({
          itemId: "",
          category: "",
          type: "",
          userId: "",
          userName: "",
          issueDescription: "",
          requestDate: "",
        });
      } else {
        const errorData = await response.json();
        // alert(`Error: ${errorData.message}`);
        toast.error(`Error: ${errorData.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error submitting the request:", error);
      // alert("Failed to submit the request.");
      toast.error("Error submitting the request:", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Fetch previous records on load
  useEffect(() => {
    const fetchPreviousRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/maintenance/userRequest");
        if (response.ok) {
          const data = await response.json();
          setPreviousRequests(data || []);
        } else {
          console.error("Failed to load previous requests.");
        }
      } catch (error) {
        console.error("Error fetching previous requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousRequests();
  }, []);

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="MAINTENANCE RECORD AND REQUEST" />

      {/* Section for displaying previous records */}
      <section>
        <h1 className="font-medium text-black dark:text-white">
          Previous Maintenance Records
        </h1>
        <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">Request Id</th> */}
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Item ID
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Category
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Type
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Request Date
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Issue Description
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Resolution Details
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Completion Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previousRequests.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-5 text-center">
                        No previous records available.
                      </td>
                    </tr>
                  ) : (
                    previousRequests.map((item, index) => (
                      <tr key={index}>
                        {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.requestId}</td> */}
                        {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">{item.userName}</td> */}
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.itemId}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.item.category}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.item.type}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {new Date(item.requestDate).toLocaleString()}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.status}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.issueDescription || "N/A"}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.resolutionDetails || "N/A"}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.completionDate
                            ? new Date(item.completionDate).toLocaleString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>

      {/* Section for submitting new requests */}
      <section>
        <h1 className="mt-10 font-medium text-black dark:text-white">
          New Maintenance Request
        </h1>
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 p-6.5 sm:grid-cols-2">
                {/* Item ID */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemId"
                    placeholder="Enter Item ID"
                    value={requestData.itemId}
                    onChange={handleChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Category <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Enter Category"
                    value={requestData.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Type <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="type"
                    placeholder="Enter Type"
                    value={requestData.type}
                    onChange={handleChange}
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
                    value={requestData.userId}
                    onChange={handleChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* User Name */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    User Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Enter User Name"
                    value={requestData.userName}
                    onChange={handleChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
                {/* Request Date */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Request Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="date"
                    name="requestDate"
                    value={requestData.requestDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Issue Description */}
                <div className="sm:col-span-2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Issue Description
                  </label>
                  <textarea
                    name="issueDescription"
                    value={requestData.issueDescription}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe the issue"
                    className="w-full resize-none rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Submit button */}
                <div className="flex justify-end sm:col-span-2">
                  <button
                    type="submit"
                    className="w-half rounded bg-primary p-3 font-medium text-gray"
                  >
                    Submit Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {notification && (
        <div className="mt-4 rounded-md bg-blue-200 p-4 text-center text-blue-800">
          {notification}
        </div>
      )}
    </div>
  );
};

export default RequestMaitenanceManagement;

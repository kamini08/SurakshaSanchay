'use client';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const RequestMaintenanceManagement = () => {
  const initialRequestData = {
    requestId: 'DefaultRequestId',
    itemId: 'DefaultItemId',
    category: 'DefaultCategory',
    type: 'DefaultType',
    userId: 'DefaultUserId',
    userName: 'DefaultUserName',
    issueDescription: 'Default issue description',
    requestDate: '2024-01-01', // Default date
    status: 'Pending',
    resolutionDetails: 'No resolution yet',
    completionDate: '',
    technicianId: '',
    rejectReason: '',
    rejectDate: '',
  };

  const [requestData, setRequestData] = useState(initialRequestData);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  interface ItemRecord {
    requestId: string;
    itemId: string;
    category: string;
    type: string;
    userId: string;
    userName: string;
    issueDescription: string;
    requestDate: string;
    status: string;
    resolutionDetails?: string;
    completionDate?: string;
    technicianId?: string;
    rejectReason?: string;
    rejectDate?: string;
  }

  const [previousRequests, setPreviousRequests] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreviousRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/requestData');
        if (response.ok) {
          const data = await response.json();
          setPreviousRequests(data.length === 0 ? [initialRequestData] : data);
        } else {
          console.error('Failed to load previous requests.');
          setPreviousRequests([initialRequestData]);
        }
      } catch (error) {
        console.error('Error fetching previous requests:', error);
        setPreviousRequests([initialRequestData]);
      } finally {
        setLoading(false);
      }
    };

    fetchPreviousRequests();
  }, []);

  const handleApprove = (requestId: string) => {
    setShowApprovalForm(true);
    setShowRejectionForm(false);
    setSelectedRequestId(requestId);
  };

  const handleReject = (requestId: string) => {
    setShowRejectionForm(true);
    setShowApprovalForm(false);
    setSelectedRequestId(requestId);
  };

  const handleApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.requestId === selectedRequestId
          ? {
              ...request,
              status: 'On Work',
              resolutionDetails: requestData.resolutionDetails,
              technicianId: requestData.technicianId,
            }
          : request
      )
    );
    alert('Approval submitted!');
    setShowApprovalForm(false);
  };

  const handleRejectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPreviousRequests((prevRequests) =>
      prevRequests.filter((request) => request.requestId !== selectedRequestId)
    );
    alert('Rejection submitted!');
    setShowRejectionForm(false);
  };

  const handleOnWork = (requestId: string) => {
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.requestId === requestId ? { ...request, status: 'On Work' } : request
      )
    );
  };

  const handleCompleted = (requestId: string) => {
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.requestId === requestId
          ? { ...request, status: 'Completed', completionDate: new Date().toLocaleString() }
          : request
      )
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="MAINTENANCE RECORD AND REQUEST" />
      <section>
        <h1 className="font-medium text-black dark:text-white">
          Previous Maintenance Records
        </h1>
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 max-w-full overflow-x-auto">
          <div className="max-w-full overflow-x-auto">
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Request Id
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Item ID
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Category
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Type
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Request Date
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      User Id
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      User Name
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Issue Description
                    </th>
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                      Status
                    </th>
                    <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previousRequests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center px-4 py-5">
                        No previous records available.
                      </td>
                    </tr>
                  ) : (
                    previousRequests.map((item, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.requestId}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.itemId}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.category}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.type}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {new Date(item.requestDate).toLocaleString()}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.userId}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.userName}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.issueDescription}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.status}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.status === 'Pending' && (
                            <>
                              <button
                                className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => handleApprove(item.requestId)}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleReject(item.requestId)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                          {item.status === 'On Work' && (
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded"
                              onClick={() => handleCompleted(item.requestId)}
                            >
                              Completed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Approval Form
        {showApprovalForm && selectedRequestId && (
          <form onSubmit={handleApprovalSubmit} className="mt-6">
            <h2 className="font-medium text-black dark:text-white">
              Approval Form for Request ID: {selectedRequestId}
            </h2>
            <label className="block mt-2">
              Resolution Details:
              <input
                type="text"
                value={requestData.resolutionDetails}
                onChange={(e) =>
                  setRequestData({ ...requestData, resolutionDetails: e.target.value })
                }
                className="border px-4 py-2 mt-1 w-full"
              />
            </label>
            <label className="block mt-2">
              Technician ID:
              <input
                type="text"
                value={requestData.technicianId}
                onChange={(e) =>
                  setRequestData({ ...requestData, technicianId: e.target.value })
                }
                className="border px-4 py-2 mt-1 w-full"
              />
            </label>
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            >
              Submit Approval
            </button>
          </form>
        )} */}

        {/* Rejection Form */}
        {/* {showRejectionForm && selectedRequestId && (
          <form onSubmit={handleRejectionSubmit} className="mt-6">
            <h2 className="font-medium text-black dark:text-white">
              Rejection Form for Request ID: {selectedRequestId}
            </h2>
            <label className="block mt-2">
              Rejection Reason:
              <input
                type="text"
                value={requestData.rejectReason}
                onChange={(e) =>
                  setRequestData({ ...requestData, rejectReason: e.target.value })
                }
                className="border px-4 py-2 mt-1 w-full"
              />
            </label>
            <button
              type="submit"
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Submit Rejection
            </button>
          </form> */}
          
      {/* Approval Form */}
{showApprovalForm && selectedRequestId && (
        <section>
          <h1 className="font-medium text-black dark:text-white mt-10">Approve Maintenance Request for Request ID: {selectedRequestId}</h1>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleApprovalSubmit}>
              <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Approval Date */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Approval Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={new Date().toLocaleString()}
                    disabled
                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Technician ID */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Technician ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={requestData.technicianId}
                    onChange={(e) => setRequestData({ ...requestData, technicianId: e.target.value })}
                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Resolution Details */}
                <div className="col-span-2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Resolution Details
                  </label>
                  <textarea
                    value={requestData.resolutionDetails}
                    onChange={(e) => setRequestData({ ...requestData, resolutionDetails: e.target.value })}
                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-half rounded bg-primary p-3 font-medium text-gray"
                  >
                    Submit Approval
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
        {showRejectionForm && selectedRequestId && (
        <section>
          <h1 className="font-medium text-black dark:text-white mt-10">Reject Maintenance Request for Request ID: {selectedRequestId}</h1>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onSubmit={handleRejectionSubmit}>
              <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Reject Reason */}
                <div className="col-span-2">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Rejection Reason <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    required
                    value={requestData.rejectReason}
                    onChange={(e) => setRequestData({ ...requestData, rejectReason: e.target.value })}
                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                {/* Reject Date */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Rejection Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={new Date().toLocaleString()}
                    disabled
                     className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-half rounded bg-primary p-3 font-medium text-gray"
                  >
                    Submit Rejection
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        )}
      </section>
    </DefaultLayout>
  );
};

export default RequestMaintenanceManagement;


'use client';
import React, { useEffect, useState } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';

const RequestMaintenanceManagement = () => {
  const initialRequestData = {
    id: 'DefaultRequestId',
    itemId: 'Defaultid',
    userId: 'DefaultUserId',
    issueDescription: 'Default issue description',
    requestDate: '2024-01-01',
    approvalDate: '',
    // Default date
    status: 'Pending',
    resolutionDescription: 'No resolution yet',
    completionDate: '',
    technicianId: '',
    discardReason: '',
    user: {
      name: "John Doe",
      govId: "123456789"
    },
    item: {
      category: "Electronics",
      type: "IT Equipment"
    },
    maintenanceCharge: 500
  };

  const [requestData, setRequestData] = useState(initialRequestData);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [showRejectionForm, setShowRejectionForm] = useState(false);
  const [showDiscardForm, setShowDiscardForm] = useState(false);
  const [showCompletionForm, setShowCompletionForm] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string>("");
  interface ItemRecord {
    id: string;
    itemId: string;
    userId: string;
    user: {
      name: string;
      govId: string;
    },
    item: {
      category: string;
      type: string;
    },
    issueDescription: string;
    requestDate: string;
    status: string;
    approvalDate: string,
    resolutionDescription?: string;
    completionDate?: string;
    technicianId?: string;
    discardReason?: string;
    maintenanceCharge?: GLfloat;
  }

  const [previousRequests, setPreviousRequests] = useState<ItemRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCondition, setNewCondition] = useState('');


  useEffect(() => {
    const fetchPreviousRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/maintenance/request');
        if (response.ok) {
          const result = await response.json();
          if (result.success && Array.isArray(result.data)) {
            const sortedRequests = result.data.sort((a: { requestDate: string | number | Date; }, b: { requestDate: string | number | Date; }) => {
              // Assuming there is a `createdAt` field or a relevant field to sort by
              return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
            });
            setPreviousRequests(sortedRequests.length === 0 ? [initialRequestData] : sortedRequests);
          } else {
            console.error('Unexpected API response structure:', result);
            setPreviousRequests([initialRequestData]);
          }
        } else {
          console.error('Failed to fetch maintenance requests:', response.statusText);
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

  const updateItemCondition = async (itemId: string, newCondition: string) => {
    try {
      const response = await fetch('/api/maintenance/updateInventory', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId,
          newCondition,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update item condition');
      }

      const updatedItem = await response.json();
      console.log('Updated Item:', updatedItem);

      alert(`Condition for item ${itemId} updated to ${newCondition}`);
      return updatedItem; // Optionally return updated data
    } catch (error: any) {
      console.error('Error updating item condition:', error.message);
      alert(`Error: ${error.message}`);
    }
  };


  const updateRequestStatus = async (
    id: string,
    action: 'approve' | 'reject' | 'complete' | 'discard',
    technicianId: string,
    resolutionDetails: string,
    discardReason: string,
    maintenanceCharge:number
  ) => {
    try {
      const response = await fetch('/api/maintenance/request', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action, // Maps to the backend's action field
          requestId: id, // Backend expects `requestId` for identification
          technicianId,
          resolutionDetails,
          discardReason,
          maintenanceCharge
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || `Failed to update status`);
      }

      const updatedRequest = await response.json();
      // Update the frontend state
      setPreviousRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, status: updatedRequest.data.status }
            : request
        )
      );

      alert(`Request status updated successfully to ${updatedRequest.data.status}`);
    } catch (error: any) {
      console.error('Error updating request:', error);
      alert(`Error updating status: ${error.message}`);
    }
  };


  const handleApprove = (id: string) => {
    setShowApprovalForm(true);
    setShowRejectionForm(false);
    setSelectedRequestId(id);
  };

  const handleReject = (id: string) => {
    setShowRejectionForm(true);
    setShowApprovalForm(false);
    setSelectedRequestId(id);
  };

  const handleApprovalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedRequest = previousRequests.find(
      (request) => request.id === selectedRequestId
    );

    if (!selectedRequest) {
      console.error('Error: No request found for the selected ID.');
      alert('Failed to find the request. Please try again.');
      return;
    }

    const selectedItemId = selectedRequest.itemId; // Capture `itemId`

    if (!selectedItemId) {
      console.error('Error: No itemId found for the selected request.');
      alert('Failed to find the itemId. Please try again.');
      return;
    }

    // Update the state with the selected request's status and capture `itemId`
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id === selectedRequestId) {
          return {
            ...request,
            status: 'APPROVED',
            technicianId: requestData.technicianId,
          };
        }
        return request;
      })
    );

    if (!selectedItemId) {
      console.error('Error: No itemId found for the selected request.');
      alert('Failed to find the itemId. Please try again.');
      return;
    }

    alert('Approval submitted!');

    try {
      // Update the request status
      await updateRequestStatus(selectedRequestId, 'approve', requestData.technicianId, '', '',0);

      // Update the item condition
      const conditionToSet = 'Under Maintenance';
      setNewCondition(conditionToSet); // Set the condition state

      // Call the `updateItemCondition` function with the correct values
      await updateItemCondition(selectedItemId, conditionToSet);
    } catch (error) {
      console.error('Error in approval process:', error);
    } finally {
      setShowApprovalForm(false); // Close the approval form
    }
  };

  const handleRejectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPreviousRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== selectedRequestId)
    );
    updateRequestStatus(selectedRequestId, 'reject', "", "", requestData.discardReason,0);
    alert('Rejection submitted!');
    setShowRejectionForm(false);
  };

  const handleOnWork = (id: string) => {
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'APPROVED' } : request
      )
    );
  };

  const handleCompleted = (id: string) => {
    setShowCompletionForm(true);
    setShowDiscardForm(false);
    setSelectedRequestId(id);
  };
  const handleCompletionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRequest = previousRequests.find(
      (request) => request.id === selectedRequestId
    );

    if (!selectedRequest) {
      console.error('Error: No request found for the selected ID.');
      alert('Failed to find the request. Please try again.');
      return;
    }

    const selectedItemId = selectedRequest.itemId; // Capture `itemId`

    if (!selectedItemId) {
      console.error('Error: No itemId found for the selected request.');
      alert('Failed to find the itemId. Please try again.');
      return;
    }
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id === selectedRequestId) {
          return {
            ...request,
            status: 'COMPLETED',
            completionDate: new Date().toLocaleString(),
          };
        }
        return request;
      }
      )
    );
    if (!selectedItemId) {
      console.error('Error: No itemId found for the selected request.');
      alert('Failed to find the itemId. Please try again.');
      return;
    }
    alert('Item maintenance completed');
    try {
      // Update the request status
      await updateRequestStatus(selectedRequestId, 'complete', '', requestData.resolutionDescription, '', requestData.maintenanceCharge);

      // Update the item condition
      const conditionToSet = 'Repaired';
      setNewCondition(conditionToSet); // Set the condition state

      // Call the `updateItemCondition` function with the correct values
      await updateItemCondition(selectedItemId, conditionToSet);
    } catch (error) {
      console.error('Error in completion process:', error);
    } finally {
      setShowCompletionForm(false); // Close the approval form
    }
  };

  const handleDiscard = (id: string) => {
    setShowCompletionForm(false);
    setShowDiscardForm(true);
    setSelectedRequestId(id);
  };
  const handleDiscardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRequest = previousRequests.find(
      (request) => request.id === selectedRequestId
    );

    if (!selectedRequest) {
      console.error('Error: No request found for the selected ID.');
      alert('Failed to find the request. Please try again.');
      return;
    }

    const selectedItemId = selectedRequest.itemId; // Capture `itemId`

    if (!selectedItemId) {
      console.error('Error: No itemId found for the selected request.');
      alert('Failed to find the itemId. Please try again.');
      return;
    }
    setPreviousRequests((prevRequests) =>
      prevRequests.map((request) => {
        if (request.id === selectedRequestId) {
          return {
            ...request,
            status: 'DISCARDED',
            completionDate: new Date().toLocaleString(),
          };
        }
        return request;
      })
    );
    if (!selectedItemId) {
      console.error('Error: No itemId found for the selected request.');
      alert('Failed to find the itemId. Please try again.');
      return;
    }
    try {
      // Update the request status
      await updateRequestStatus(selectedRequestId, 'discard', '', '', requestData.discardReason, requestData.maintenanceCharge);

      // Update the item condition
      const conditionToSet = 'Discarded';
      setNewCondition(conditionToSet); // Set the condition state

      // Call the `updateItemCondition` function with the correct values
      await updateItemCondition(selectedItemId, conditionToSet);
    } catch (error) {
      console.error('Error in approval process:', error);
    } finally {
      setShowDiscardForm(false); // Close the approval form
    }
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
                    {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Request Id
                    </th> */}
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
                        {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.id}
                        </td> */}
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
                          {item.user.govId}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.user.name}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.issueDescription}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.status}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {item.status === 'PENDING' && (
                            <>
                              <button
                                className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => handleApprove(item.id)}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => handleReject(item.id)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {item.status === 'APPROVED' && (
                            <>
                              <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => handleCompleted(item.id)}
                              >
                                Complete
                              </button>
                              <button
                                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => handleDiscard(item.id)}
                              >
                                Discard
                              </button>
                            </>
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
                      value={requestData.technicianId}
                      onChange={(e) => setRequestData({ ...requestData, technicianId: e.target.value })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
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
                      value={requestData.discardReason}
                      onChange={(e) => setRequestData({ ...requestData, discardReason: e.target.value })}
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

        {/* completion form */}
        {showCompletionForm && selectedRequestId && (
          <section>
            <h1 className="font-medium text-black dark:text-white mt-10">Reject Maintenance Request for Request ID: {selectedRequestId}</h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form onSubmit={handleCompletionSubmit}>
                <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Resolution Details */}
                  <div className="col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Resolution Details
                    </label>
                    <textarea
                      value={requestData.resolutionDescription}
                      onChange={(e) => setRequestData({ ...requestData, resolutionDescription: e.target.value })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    ></textarea>
                  </div>

                  {/* Completion Date
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Completion Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={new Date().toLocaleString()}
                      disabled
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div> */}

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Maintenance Charge
                    </label>
                    <input
                      type="number"
                      name="maintenanceCharge"
                      placeholder="Enter Maintenance Charge"
                      value={requestData.maintenanceCharge}
                      onChange={(e) => setRequestData({ ...requestData, maintenanceCharge: parseFloat(e.target.value) })}
                      min="0"
                      step="0.01"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-half rounded bg-primary p-3 font-medium text-gray"
                    >
                      Submit Completion
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        )}

        {/* discard form */}
        {showDiscardForm && selectedRequestId && (
          <section>
            <h1 className="font-medium text-black dark:text-white mt-10">Reject Maintenance Request for Request ID: {selectedRequestId}</h1>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <form onSubmit={handleDiscardSubmit}>
                <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Reject Reason */}
                  <div className="col-span-2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Discard Reason <span className="text-meta-1">*</span>
                    </label>
                    <textarea
                      required
                      value={requestData.discardReason}
                      onChange={(e) => setRequestData({ ...requestData, discardReason: e.target.value })}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    ></textarea>
                  </div>

                  {/* Reject Date
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Discard Date <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={new Date().toLocaleString()}
                      disabled
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div> */}

                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Maintenance Charge
                    </label>
                    <input
                      type="number"
                      name="maintenanceCharge"
                      placeholder="Enter Maintenance Charge"
                      value={requestData.maintenanceCharge}
                      onChange={(e) => setRequestData({ ...requestData, maintenanceCharge: parseFloat(e.target.value) })}
                      min="0"
                      step="0.01"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end">
                    <button
                      type="submit"
                      className="w-half rounded bg-primary p-3 font-medium text-gray"
                    >
                      Submit Discard
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


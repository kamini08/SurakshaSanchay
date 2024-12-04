"use client";
import { useParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

interface Package {
  itemId: string;
  category: string;
  type: string;
  description?: string;
  quantity: number;
  location?: string;
  condition: string;
  acquisitionDate?: string;
  expiryDate?: string;
  price?: number;
  supplier?: string;
  assignedTo?: string;
  returnDate?: string;
  lastInspectionDate?: string;
  maintenanceSchedule?: string;
  maintenanceCharge?: number;
  issuedTo?: string;
  userId?: string;
  user?: string | null;
  status?: string;
  communicationDevice?: any;
  computerAndItEquipment?: any;
  networkingEquipment?: any;
  surveillanceAndTracking?: any;
  vehicleAndAccessories?: any;
  protectiveGear?: any;
  firearms?: any;
  forensic?: any;
  medicalFirstAid?: any;
  officeSupplies?: any;
}

const defaultData: Package[] = [];

const ViewInventoryIndividual = () => {
  const [packageData, setPackageData] = useState<Package[]>(defaultData);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<number | null>(null); // Track the row being edited by index
  const [editedRow, setEditedRow] = useState<Partial<Package>>({}); // Store data being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [rowToDelete, setRowToDelete] = useState<number | null>(null); // Track the row to delete

  const params = useParams();

  // Decode stationId from URL params
  const stationId = params?.stationId
    ? decodeURIComponent(params.stationId as string)
    : null;
  const excludeNullValues = (obj: any) => {
    return JSON.stringify(
      obj,
      (key, value) => {
        // Exclude null values and specific keys
        if (value === null || key === "id" || key === "inventoryItemId") {
          return undefined;
        }
        return value;
      },
      2, // Indentation level for pretty printing
    );
  };
  const renderKeyValuePairs = (data: any) => {
    return (
      <div>
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <strong>{key}:</strong> {String(value)}
          </div>
        ))}
      </div>
    );
  };

  // const jsonStr = excludeNullValues(item["surveillanceAndTracking"]);

  // Parse the string back into an object
  // const parsedData = JSON.parse(jsonStr);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/station/${stationId}`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            console.log(data);
            setPackageData(data);
          } else {
            setPackageData(defaultData);
          }
        } else {
          setPackageData(defaultData);
        }
      } catch (error) {
        setPackageData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stationId]);

  // Enter edit mode for a specific row
  const handleEditClick = (index: number): void => {
    setEditMode(index);
    setEditedRow({ ...packageData[index] });
  };

  // Save the edited row data
  const handleSaveClick = async (index: number): Promise<void> => {
    const updatedData = [...packageData];
    updatedData[index] = editedRow as Package;
    setPackageData(updatedData);
    setEditMode(null);

    try {
      const response = await fetch("/api/inventory", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: packageData[index].itemId, // Send the id of the item to be updated
          fieldsToUpdate: editedRow, // Send the edited details
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update inventory");
      }

      const updatedInventory = await response.json();
      console.log("Inventory updated:", updatedInventory);
    } catch (error) {
      console.error("Error saving edited data:", error);
    }
  };

  // Delete a row from the table
  const handleDeleteClick = (index: number): void => {
    setRowToDelete(index);
    setIsModalOpen(true);
  };
  // Confirm the deletion and delete from the backend
  const handleConfirmDelete = async (): Promise<void> => {
    if (rowToDelete !== null) {
      const itemId = packageData[rowToDelete].itemId; // Get the item id to delete

      // Delete the item from the database via the API
      try {
        const response = await fetch("/api/inventory", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemId: itemId }), // Send the id of the item to delete
        });

        if (!response.ok) {
          throw new Error("Failed to delete inventory");
        }

        const deletedInventory = await response.json();
        console.log("Deleted inventory item:", deletedInventory);

        // Update the frontend after deletion
        const updatedData = packageData.filter((_, i) => i !== rowToDelete);
        setPackageData(updatedData);
      } catch (error) {
        console.error("Error deleting inventory:", error);
      }
    }

    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCancelDelete = (): void => {
    setIsModalOpen(false);
  };

  // Handle input changes during editing
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Package,
  ): void => {
    const { value } = e.target;
    setEditedRow((prev) => ({
      ...prev,
      [field]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="VIEW INVENTORY ITEMS" />
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Item Id
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Category
                  </th>
                  <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Type
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Issued To</th> */}
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Quantity
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Location
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Condition
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Acquisition Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Expiry Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Price
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Supplier
                  </th>
                  {/* <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">Assigned to</th> */}
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Return Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Last Inspection Date
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Maintenance Schedule
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Maintenance Charge
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Issued To
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    User Id
                  </th>
                  <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                    Category detatails
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {packageData.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="itemId"
                          value={editedRow.itemId || ""}
                          onChange={(e) => handleInputChange(e, "itemId")}
                          className="border p-1"
                        />
                      ) : (
                        item.itemId
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="category"
                          value={editedRow.category || ""}
                          onChange={(e) => handleInputChange(e, "category")}
                          className="border p-1"
                        />
                      ) : (
                        item.category
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="type"
                          value={editedRow.type || ""}
                          onChange={(e) => handleInputChange(e, "type")}
                          className="border p-1"
                        />
                      ) : (
                        item.type
                      )}
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="issuedTo"
                        value={editedRow.issuedTo || ""}
                        onChange={(e) => handleInputChange(e, "issuedTo")}
                        className="border p-1"
                      />
                    ) : (
                      item.issuedTo
                    )}
                  </td> */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="number"
                          name="quantity"
                          value={editedRow.quantity || 0}
                          onChange={(e) => handleInputChange(e, "quantity")}
                          className="border p-1"
                        />
                      ) : (
                        item.quantity
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="location"
                          value={editedRow.location || ""}
                          onChange={(e) => handleInputChange(e, "location")}
                          className="border p-1"
                        />
                      ) : (
                        item.location
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="condition"
                          value={editedRow.condition || ""}
                          onChange={(e) => handleInputChange(e, "condition")}
                          className="border p-1"
                        />
                      ) : (
                        item.condition
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="acquisitionDate"
                          value={editedRow.acquisitionDate || ""}
                          onChange={(e) =>
                            handleInputChange(e, "acquisitionDate")
                          }
                          className="border p-1"
                        />
                      ) : (
                        item.acquisitionDate
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="expiryDate"
                          value={editedRow.expiryDate || ""}
                          onChange={(e) => handleInputChange(e, "expiryDate")}
                          className="border p-1"
                        />
                      ) : (
                        item.expiryDate
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="number"
                          name="price"
                          value={editedRow.price || 0}
                          onChange={(e) => handleInputChange(e, "price")}
                          className="border p-1"
                        />
                      ) : (
                        item.price
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="supplier"
                          value={editedRow.supplier || ""}
                          onChange={(e) => handleInputChange(e, "supplier")}
                          className="border p-1"
                        />
                      ) : (
                        item.supplier
                      )}
                    </td>
                    {/* <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    {editMode === index ? (
                      <input
                        type="text"
                        name="assignedTo"
                        value={editedRow.assignedTo || ""}
                        onChange={(e) => handleInputChange(e, "assignedTo")}
                        className="border p-1"
                      />
                    ) : (
                      item.assignedTo
                    )}
                  </td> */}
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="returnDate"
                          value={editedRow.returnDate || ""}
                          onChange={(e) => handleInputChange(e, "returnDate")}
                          className="border p-1"
                        />
                      ) : (
                        item.returnDate
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="lastInspectionDate"
                          value={editedRow.lastInspectionDate || ""}
                          onChange={(e) =>
                            handleInputChange(e, "lastInspectionDate")
                          }
                          className="border p-1"
                        />
                      ) : (
                        item.lastInspectionDate
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="maintenanceSchedule"
                          value={editedRow.maintenanceSchedule || ""}
                          onChange={(e) =>
                            handleInputChange(e, "maintenanceSchedule")
                          }
                          className="border p-1"
                        />
                      ) : (
                        item.maintenanceSchedule
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="maintenanceCharge"
                          value={editedRow.maintenanceCharge || ""}
                          onChange={(e) =>
                            handleInputChange(e, "maintenanceCharge")
                          }
                          className="border p-1"
                        />
                      ) : (
                        item.maintenanceCharge
                      )}
                    </td>

                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="issuedTo"
                          value={editedRow.issuedTo || ""}
                          onChange={(e) => handleInputChange(e, "issuedTo")}
                          className="border p-1"
                        />
                      ) : (
                        item.issuedTo
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="userId"
                          value={editedRow.userId || ""}
                          onChange={(e) => handleInputChange(e, "userId")}
                          className="border p-1"
                        />
                      ) : (
                        item.userId
                      )}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      {editMode === index ? (
                        <input
                          type="text"
                          name="userId"
                          value={editedRow.userId || ""}
                          onChange={(e) => handleInputChange(e, "userId")}
                          className="border p-1"
                        />
                      ) : (
                        <div key={index} style={{ marginBottom: "20px" }}>
                          {/* <h2>Item {index + 1}</h2> */}
                          <pre>
                            {excludeNullValues(item["communicationDevice"])}
                          </pre>
                          <pre>
                            {excludeNullValues(item["computerAndItEquipment"])}
                          </pre>
                          <pre>
                            {excludeNullValues(item["networkingEquipment"])}
                          </pre>
                          <pre>
                            {excludeNullValues(item["surveillanceAndTracking"])}
                          </pre>
                          <pre>
                            {excludeNullValues(item["vehicleAndAccessories"])}
                          </pre>
                          <pre>{excludeNullValues(item["protectiveGear"])}</pre>
                          <pre>{excludeNullValues(item["firearms"])}</pre>
                          <pre>{excludeNullValues(item["forensic"])}</pre>

                          <pre>
                            {excludeNullValues(item["medicalFirstAid"])}
                          </pre>

                          <pre>{excludeNullValues(item["officeSupplies"])}</pre>
                        </div>
                      )}
                    </td>

                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <div className="flex gap-3">
                        {editMode === index ? (
                          <>
                            {/* <button onClick={() => handleSaveClick(index)} className="bg-blue-500 text-white p-2 rounded">Save</button> */}
                            {/* <button onClick={() => setEditMode(null)} className="bg-gray-500 text-white p-2 rounded ml-2">Cancel</button> */}
                            <button
                              onClick={() => handleSaveClick(index)}
                              className="text-xl font-bold text-green-600 hover:text-green-800"
                            >
                              &#10004; {/* Checkmark icon */}
                            </button>
                            &nbsp;&nbsp;
                            <button
                              onClick={() => setEditMode(null)}
                              className="text-xl font-bold text-gray-600 hover:text-gray-800"
                            >
                              &#10006; {/* Cross (X) icon */}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditClick(index)}
                              className="inline-block rotate-[-270deg] transform text-xl font-bold text-blue-600 hover:text-blue-800"
                            >
                              &#9998;
                            </button>
                            &nbsp;&nbsp;
                            <button
                              onClick={() => handleDeleteClick(index)}
                              className="text-xl font-bold text-red-600 hover:text-red-800"
                            >
                              &#128465;
                            </button>
                            {/* <button onClick={() => handleEditClick(index)} className="bg-green-500 text-white p-2 rounded">Edit</button>
                        <button onClick={() => handleDeleteClick(index)} className="bg-red-500 text-white p-2 rounded ml-2">Delete</button> */}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="rounded bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl">
                Are you sure you want to delete this row?
              </h3>
              <button
                onClick={handleConfirmDelete}
                className="rounded bg-red-500 p-2 text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="ml-2 rounded bg-gray-500 p-2 text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ViewInventoryIndividual;


"use client";

import { useState,ChangeEvent, FormEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultiSelect from "@/components/FormElements/MultiSelect";

const AddInventory = () => {
  // State for Inventory Form
  const [inventoryFormData, setInventoryFormData] = useState({
    itemId: "",
    category: [] as string[],
    type: "",
    description: "",
    quantity: 1,
    location: "",
    condition: "",
    acquisitionDate: "",
    expiryDate: "",
    price: "",
    supplier: "",
    returnDate: "",
    lastInspectionDate: "",
    maintenanceSchedule: "",
    maintenanceCharge: "",
    issuedTo: "",
    userId: "",
  });

  // Handle field changes for Inventory
  const handleInventoryChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInventoryFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle multi-select change for categories
  const handleCategoryChange = (selectedCategories: string[]) => {
    setInventoryFormData((prev) => ({ ...prev, category: selectedCategories }));
  };

  // Submit Inventory Form
  const handleInventorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inventoryFormData),
      });

      if (response.ok) {
        alert("Inventory added successfully!");
        setInventoryFormData({
          itemId: "",
          category: [],
          type: "",
          description: "",
          quantity: 1,
          location: "",
          condition: "",
          acquisitionDate: "",
          expiryDate: "",
          price: "",
          supplier: "",
          returnDate: "",
          lastInspectionDate: "",
          maintenanceSchedule: "",
          maintenanceCharge: "",
          issuedTo: "",
          userId: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting inventory form:", error);
      alert("Failed to submit the inventory.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="ADD INVENTORY FORM" />

      {/* Full-Width Inventory Form */}
      <div className="flex flex-col gap-9 overflow-x-hidden ">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={handleInventorySubmit}>
            <div className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {/* Item ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Item ID <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="itemId"
                  placeholder="Enter Item ID"
                  value={inventoryFormData.itemId}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category <span className="text-meta-1">*</span>
                </label>
                <MultiSelect
                  id="category"
                  options={[
                    "communicationDevice",
                    "computerAndITEquipment",
                    "networkingEquipment",
                    "surveillanceAndTracking",
                    "vehicleAndAccessories",
                    "protectiveGear",
                    "firearm",
                    "forensicEquipment",
                    "medicalFirstAid",
                    "officeSupply",
                  ]}
                  selectedOptions={inventoryFormData.category}
                  onChange={handleCategoryChange}
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
                  value={inventoryFormData.type}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Description <span className="text-meta-1">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Description"
                  value={inventoryFormData.description}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Quantity <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={inventoryFormData.quantity}
                  onChange={handleInventoryChange}
                  required
                  min="1"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Location */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Location <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Enter Location"
                  value={inventoryFormData.location}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Condition */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Condition <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  name="condition"
                  placeholder="Enter Condition"
                  value={inventoryFormData.condition}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Acquisition Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Acquisition Date <span className="text-meta-1">*</span>
                </label>
                <input
                  type="date"
                  name="acquisitionDate"
                  value={inventoryFormData.acquisitionDate}
                  onChange={handleInventoryChange}
                  required
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
              {/* Expiry Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={inventoryFormData.expiryDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Price */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Price <span className="text-meta-1">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Price"
                  value={inventoryFormData.price}
                  onChange={handleInventoryChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Supplier */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Supplier
                </label>
                <input
                  type="text"
                  name="supplier"
                  placeholder="Enter Supplier"
                  value={inventoryFormData.supplier}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Return Date
                </label>
                <input
                  type="date"
                  name="returnDate"
                  value={inventoryFormData.returnDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Last Inspection Date */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Last Inspection Date
                </label>
                <input
                  type="date"
                  name="lastInspectionDate"
                  value={inventoryFormData.lastInspectionDate}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Maintenance Schedule */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Maintenance Schedule
                </label>
                <input
                  type="text"
                  name="maintenanceSchedule"
                  placeholder="Enter Maintenance Schedule"
                  value={inventoryFormData.maintenanceSchedule}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Maintenance Charge */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Maintenance Charge
                </label>
                <input
                  type="number"
                  name="maintenanceCharge"
                  placeholder="Enter Maintenance Charge"
                  value={inventoryFormData.maintenanceCharge}
                  onChange={handleInventoryChange}
                  min="0"
                  step="0.01"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* Issued To */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Issued To
                </label>
                <input
                  type="text"
                  name="issuedTo"
                  placeholder="Enter Name of Person or Unit"
                  value={inventoryFormData.issuedTo}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>

              {/* User ID */}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  placeholder="Enter User ID"
                  value={inventoryFormData.userId}
                  onChange={handleInventoryChange}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                />
              </div>
            </div>

            <div className="col-span-full flex justify-end">
                <button
                  type="submit"
                  className="w-half mb-4 mr-4 rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                >
                  Add Inventory Item
                </button>
              </div>
             
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddInventory;

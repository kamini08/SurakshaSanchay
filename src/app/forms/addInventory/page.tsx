// "use client";
// import React from "react";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
// import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
// import MultiSelect from "@/components/FormElements/MultiSelect";

// const AddInventory = () => {
//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="ADD INVENTORY ITEMS" />

//       <div className="container mx-auto px-6">
//         {/* <h1 className="text-2xl font-bold mb-4">Add Inventory Item</h1> */}

//         <form className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {/* Item ID */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Item ID
//             </label>
//             <input
//               type="text"
//               name="itemId"
//               placeholder="Enter Item ID"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Category */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Category
//             </label>
//             <MultiSelect
//               id="category"
//               options={[
//                 "communicationDevice",
//                 "computerAndITEquipment",
//                 "networkingEquipment",
//                 "surveillanceAndTracking",
//                 "vehicleAndAccessories",
//                 "protectiveGear",
//                 "firearm",
//                 "forensicEquipment",
//                 "medicalFirstAid",
//                 "officeSupply"
//               ]}
//             />
//           </div>

//           {/* Type */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Type
//             </label>
//             <input
//               type="text"
//               name="type"
//               placeholder="Enter Type"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col md:col-span-2 lg:col-span-3">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Enter Description"
//               rows={4}
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             ></textarea>
//           </div>

//           {/* Quantity */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Quantity
//             </label>
//             <input
//               type="number"
//               name="quantity"
//               min="1"
//               placeholder="Enter Quantity"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Location */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               placeholder="Enter Location"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Condition */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Condition
//             </label>
//             <input
//               type="text"
//               name="condition"
//               placeholder="Enter Condition"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Acquisition Date */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Acquisition Date
//             </label>
//             <DatePickerOne />
//           </div>

//           {/* Expiry Date */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Expiry Date
//             </label>
//             <DatePickerTwo />
//           </div>

//           {/* Price */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Price
//             </label>
//             <input
//               type="number"
//               name="price"
//               placeholder="Enter Price"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Supplier */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Supplier
//             </label>
//             <input
//               type="text"
//               name="supplier"
//               placeholder="Enter Supplier"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Assigned To */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Assigned To
//             </label>
//             <input
//               type="text"
//               name="assignedTo"
//               placeholder="Enter Assignee"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Return Date */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Return Date
//             </label>
//             <input
//               type="date"
//               name="returnDate"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Last Inspection Date */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Last Inspection Date
//             </label>
//             <input
//               type="date"
//               name="lastInspectionDate"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Maintenance Schedule */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Maintenance Schedule
//             </label>
//             <input
//               type="text"
//               name="maintenanceSchedule"
//               placeholder="Enter Maintenance Schedule"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Maintenance Charge */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Maintenance Charge
//             </label>
//             <input
//               type="number"
//               name="maintenanceCharge"
//               placeholder="Enter Maintenance Charge"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>

//           {/* Issued To */}
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               Issued To
//             </label>
//             <input
//               type="text"
//               name="issuedTo"
//               placeholder="Enter Issued To"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//               User ID
//             </label>
//             <input
//               type="text"
//               name="userId"
//               placeholder="Enter User Id"
//               className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
//             />
//           </div>
//         </form>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default AddInventory;
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
      <div className="flex flex-col gap-9">
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

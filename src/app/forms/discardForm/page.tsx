
"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const DiscardForm = () => {
  const [discardFormData, setDiscardFormData] = useState({
    itemId: "",
    itemName: "",
    category: "",
    quantity: 1,
    location: "",
    requestDate: "",
    previouslyRepaired: false,
    repairCost: "",
    discardReason: "",
    additionalNotes: "",
    attachments: [] as File[],
  });

  //const handleDiscardChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  
  //   if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
  //     setDiscardFormData((prev) => ({
  //       ...prev,
  //       [name]: e.target.checked,
  //     }));
  //   } else {
  //     setDiscardFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleDiscardChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
  
    if (target.type === "checkbox") {
      setDiscardFormData((prev) => ({
        ...prev,
        [target.name]: target.checked,
      }));
    } else {
      setDiscardFormData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    }
  };
  

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setDiscardFormData((prev) => ({
  //       ...prev,
  //       attachments: Array.from(e.target.files),
  //     }));
  //   }
  // };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
  
    if (files) {
      setDiscardFormData((prev) => ({
        ...prev,
        attachments: Array.from(files), // Safely handling the non-null case
      }));
    } else {
      // Handle the case where `files` is null, if necessary
      setDiscardFormData((prev) => ({
        ...prev,
        attachments: [], // Clear attachments if no files are selected
      }));
    }
  };
  

  // const handleDiscardSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   Object.entries(discardFormData).forEach(([key, value]) => {
  //     if (key === "attachments") {
  //       value.forEach((file) => formData.append("attachments", file));
  //     } else {
  //       formData.append(key, value);
  //     }
  //   });
  const handleDiscardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(discardFormData).forEach(([key, value]) => {
      if (key === "attachments") {
        (value as File[]).forEach((file) => formData.append("attachments", file));
      } else {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch("/api/discard-requests", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Discard request submitted successfully!");
        setDiscardFormData({
          itemId: "",
          itemName: "",
          category: "",
          quantity: 1,
          location: "",
          requestDate: "",
          previouslyRepaired: false,
          repairCost: "",
          discardReason: "",
          additionalNotes: "",
          attachments: [],
        });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting discard form:", error);
      alert("Failed to submit the discard request.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="DISCARD ITEM FORM" />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <form onSubmit={handleDiscardSubmit}>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Discard Item Details
                </h3>
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6.5">
                {/* Item ID */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemId"
                    placeholder="Enter Item ID"
                    value={discardFormData.itemId}
                    onChange={handleDiscardChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Name/Description <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    placeholder="Enter Item Name"
                    value={discardFormData.itemName}
                    onChange={handleDiscardChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Item Category */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Item Category <span className="text-meta-1">*</span>
                  </label>
                  <select
                    name="category"
                    value={discardFormData.category}
                    onChange={handleDiscardChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  >
                    <option value="">Select Category</option>
                    <option value="communicationDevice">Communication Device</option>
                    <option value="computerAndITEquipment">Computer and IT Equipment</option>
                    <option value="networkingEquipment">Networking Equipment</option>
                    <option value="surveillanceAndTracking">Surveillance and Tracking</option>
                    <option value="vehicleAndAccessories">Vehicle and Accessories</option>
                    <option value="protectiveGear">Protective Gear</option>
                    <option value="firearm">Firearm</option>
                    <option value="forensicEquipment">Forensic Equipment</option>
                    <option value="medicalFirstAid">Medical/First Aid</option>
                    <option value="officeSupply">Office Supply</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Quantity <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={discardFormData.quantity}
                    onChange={handleDiscardChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
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
                    placeholder="Enter Storage Location"
                    value={discardFormData.location}
                    onChange={handleDiscardChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Request Date */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Request Date <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="requestDate"
                    value={discardFormData.requestDate}
                    onChange={handleDiscardChange}
                    required
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Previously Repaired */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Previously Repaired?
                  </label>
                  <input
                    type="checkbox"
                    name="previouslyRepaired"
                    checked={discardFormData.previouslyRepaired}
                    onChange={handleDiscardChange}
                    className="mr-2"
                  />
                  <span className="text-black dark:text-white">Yes</span>
                </div>

                {/* Repair Cost */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Estimated Repair Cost (Optional)
                  </label>
                  <input
                    type="number"
                    name="repairCost"
                    value={discardFormData.repairCost}
                    onChange={handleDiscardChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>

                {/* Discard Reason */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Discard Reason <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    name="discardReason"
                    rows={4}
                    value={discardFormData.discardReason}
                    onChange={handleDiscardChange}
                    required
                    placeholder="Enter the reason for discarding the item"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="additionalNotes"
                    rows={4}
                    value={discardFormData.additionalNotes}
                    onChange={handleDiscardChange}
                    placeholder="Provide any additional details here"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  ></textarea>
                </div>

                {/* Attachments */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Attachments (Optional)
                  </label>
                  <input
                    type="file"
                    name="attachments"
                    multiple
                    onChange={handleFileChange}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                  />
                </div>
              </div>

             
              <div className="col-span-full flex justify-end">
                <button
                  type="submit"
                  className="w-half mb-4 mr-4 rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                >
                  Submit Discard Item Request
                </button>
              </div>
             
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DiscardForm;


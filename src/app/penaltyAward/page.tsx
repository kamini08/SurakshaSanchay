
'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState } from "react";

const App: React.FC = () => {
  const [formType, setFormType] = useState<"penalty" | "award" | null>(null);

  return (
    <DefaultLayout>
<Breadcrumb pageName="AWARD AND PENALTY FORM" />
    <div className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white min-h-screen  overflow-x-hidden">
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Penalty and Award Form</h1>

        {/* Buttons to toggle between forms */}
        <div className="flex space-x-4 mb-6">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => setFormType("penalty")}
          >
            Log Penalty
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            onClick={() => setFormType("award")}
          >
            Log Award
          </button>
        </div>

        {/* Conditional Rendering of Forms */}
        {formType === "penalty" && <PenaltyForm />}
        {formType === "award" && <AwardForm />}
      </div>
    </div>
    </DefaultLayout>
  );
};

// Penalty Form Component
const PenaltyForm: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Penalty form submitted!");
  };

  return (
   

    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Penalty Details</h2>

      {/* User ID */}
      <div className="mb-4">
        <label htmlFor="userId" className="block mb-2">
          User ID
        </label>
        <input
          id="userId"
          type="text"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter User ID"
        />
      </div>

      {/* User Name */}
      <div className="mb-4">
        <label htmlFor="userName" className="block mb-2">
          User Name
        </label>
        <input
          id="userName"
          type="text"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter User Name"
        />
      </div>

      {/* Penalty Reason */}
      <div className="mb-4">
        <label htmlFor="penaltyReason" className="block mb-2">
          Penalty Reason
        </label>
        <select
          id="penaltyReason"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        >
          <option value="RETURN_DELAYED">Return Delayed</option>
          <option value="ITEM_LOST">Item Lost</option>
          <option value="ITEM_DAMAGED">Item Damaged</option>
        </select>
      </div>

      {/* Penalty Amount */}
      <div className="mb-4">
        <label htmlFor="penaltyAmount" className="block mb-2">
          Penalty Amount
        </label>
        <input
          id="penaltyAmount"
          type="number"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Penalty Amount"
        />
      </div>

      {/* Stars Reduced */}
      <div className="mb-4">
        <label htmlFor="starsReduced" className="block mb-2">
          Number of Stars Reduced
        </label>
        <input
          id="starsReduced"
          type="number"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Stars Reduced"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="penaltyDescription" className="block mb-2">
          Description
        </label>
        <textarea
          id="penaltyDescription"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Description"
        />
      </div>

      {/* Incharge ID */}
      <div className="mb-4">
        <label htmlFor="inchargeId" className="block mb-2">
          Incharge ID
        </label>
        <input
          id="inchargeId"
          type="text"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Incharge ID"
        />
      </div>

      {/* Date */}
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">
          Date
        </label>
        <input
          id="date"
          type="date"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Penalty
      </button>
    </form>
  
  );
};

// Award Form Component
const AwardForm: React.FC = () => {
 
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Award form submitted!");
  };

  return (
    
    
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Award Details</h2>

      {/* User ID */}
      <div className="mb-4">
        <label htmlFor="userId" className="block mb-2">
          User ID
        </label>
        <input
          id="userId"
          type="text"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter User ID"
        />
      </div>

      {/* Stars Added */}
      <div className="mb-4">
        <label htmlFor="starsAdded" className="block mb-2">
          Number of Stars Added
        </label>
        <input
          id="starsAdded"
          type="number"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Stars Added"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="awardDescription" className="block mb-2">
          Description
        </label>
        <textarea
          id="awardDescription"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Description"
        />
      </div>

      {/* Incharge ID */}
      <div className="mb-4">
        <label htmlFor="inchargeId" className="block mb-2">
          Incharge ID
        </label>
        <input
          id="inchargeId"
          type="text"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          placeholder="Enter Incharge ID"
        />
      </div>

      {/* Date */}
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">
          Date
        </label>
        <input
          id="date"
          type="date"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Award
      </button>
    </form>
  
  
  );
};

export default App;


"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import React, { useState } from "react";

const App: React.FC = () => {
  const [formType, setFormType] = useState<"penalty" | "award" | null>(null);

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="AWARD AND PENALTY FORM" />
      <div className="min-h-screen w-full overflow-x-hidden rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input  dark:text-white">
        <div className="mx-auto max-w-3xl p-8">
          <h1 className="mb-6 text-2xl font-bold">Penalty and Award Form</h1>

          {/* Buttons to toggle between forms */}
          <div className="mb-6 flex space-x-4">
            <button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => setFormType("penalty")}
            >
              Log Penalty
            </button>
            <button
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
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
    </div>
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
      <h2 className="mb-4 text-xl font-semibold">Penalty Details</h2>

      {/* User ID */}
      <div className="mb-4">
        <label htmlFor="userId" className="mb-2 block">
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
        <label htmlFor="userName" className="mb-2 block">
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
        <label htmlFor="penaltyReason" className="mb-2 block">
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
        <label htmlFor="penaltyAmount" className="mb-2 block">
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
        <label htmlFor="starsReduced" className="mb-2 block">
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
        <label htmlFor="penaltyDescription" className="mb-2 block">
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
        <label htmlFor="inchargeId" className="mb-2 block">
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
        <label htmlFor="date" className="mb-2 block">
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
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
      <h2 className="mb-4 text-xl font-semibold">Award Details</h2>

      {/* User ID */}
      <div className="mb-4">
        <label htmlFor="userId" className="mb-2 block">
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
        <label htmlFor="starsAdded" className="mb-2 block">
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
        <label htmlFor="awardDescription" className="mb-2 block">
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
        <label htmlFor="inchargeId" className="mb-2 block">
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
        <label htmlFor="date" className="mb-2 block">
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
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit Award
      </button>
    </form>
  );
};

export default App;

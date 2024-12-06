"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const AuditForm = () => {
  // State for the form data
  const [formData, setFormData] = useState({
    auditOfficerName: "",
    auditOfficerId: "",
    location: "",
    startDate: "",
    endDate: "",
    policyName: "",
    findings: "",
    impact: "",
    recommendation: "",
    complianceStatus: "",
    compliancePercentage: "",
    specializedEquipment: "",
    operationalAssets: "",
    governmentFundedItems: "",
    url: "",
  });

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit form to backend
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data submitted successfully!");
        // Reset form
        setFormData({
          auditOfficerName: "",
          auditOfficerId: "",
          location: "",
          startDate: "",
          endDate: "",
          policyName: "",
          findings: "",
          impact: "",
          recommendation: "",
          complianceStatus: "",
          compliancePercentage: "",
          specializedEquipment: "",
          operationalAssets: "",
          governmentFundedItems: "",
          url: "",
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit data.");
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Inventory" />

      <div className="flex flex-col gap-9 overflow-x-hidden bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form
            onSubmit={handleSubmit}
            className="p-6.5 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >

            {/* Audit Report Fields */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Audit Officer Name
              </label>
              <input
                type="text"
                name="auditOfficerName"
                placeholder="Enter audit officer's name"
                value={formData.auditOfficerName}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Audit Officer ID
              </label>
              <input
                type="text"
                name="auditOfficerId"
                placeholder="Enter audit officer's ID"
                value={formData.auditOfficerId}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                placeholder="Enter Start Date "
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                placeholder="Enter End Date "
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            {/* Policy Fields */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Policy Name
              </label>
              <select
                name="policyName"
                value={formData.policyName}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              >
                <option value="">Select Policy</option>
                <option value="STORAGE_POLICY">Storage Policy</option>
                <option value="PROCUREMENT_POLICY">Procurement Policy</option>
                <option value="PURCHASE_POLICY">Purchase Policy</option>
                <option value="USAGE_AND_DEPLOYMENT_POLICY">
                  Usage and Deployment Policy
                </option>
                <option value="DISPOSAL_POLICY">Disposal Policy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Policy ID
              </label>
              <input
                type="text"
                name="auditOfficerId"
                placeholder="Enter audit officer's ID"
                value={formData.auditOfficerId}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Findings
              </label>
              <input
                type="text"
                name="findings"
                placeholder="Enter findings of the audit"
                value={formData.findings}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Compliance Status
              </label>
              <select
                name="complianceStatus"
                value={formData.complianceStatus}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              >
                <option value="">Select Status</option>
                <option value="COMPLIANT">Compliant</option>
                <option value="NON_COMPLIANT">Non-Compliant</option>
                <option value="PARTIALLY_COMPLIANT">Partially Compliant</option>
              </select>
            </div>

            {/* Stock Fields */}
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Specialized Equipment
              </label>
              <input
                type="number"
                name="specializedEquipment"
                placeholder="Enter count of specialized equipment"
                value={formData.specializedEquipment}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Compliance Percentage
              </label>
              <input
                type="number"
                name="compliancePercentage"
                placeholder="Enter count of specialized equipment"
                value={formData.compliancePercentage}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Operational Assets
              </label>
              <input
                type="number"
                name="operationalAssets"
                placeholder="Enter count of operational assets"
                value={formData.operationalAssets}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                Government Funded Items
              </label>
              <input
                type="number"
                name="governmentFundedItems"
                placeholder="Enter count of government-funded items"
                value={formData.governmentFundedItems}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black dark:text-white mb-2">
                URL (Audit Report)
              </label>
              <input
                type="url"
                name="url"
                placeholder="Enter URL of the audit report"
                value={formData.url}
                onChange={handleChange}
                className="w-full rounded border-[1.5px] px-5 py-3 bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
              />
            </div>

            <div className="col-span-full flex justify-end">
              <button
                type="submit"
                className="rounded bg-primary px-6 py-3 text-white hover:bg-opacity-90"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AuditForm;

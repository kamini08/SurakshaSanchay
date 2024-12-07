import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
import "./AdminInventoryReport.css"

interface AdminReportData {
  summary: {
    totalInventoryValue: number;
    totalItems: number;
    newProcurements: number;
    reorderStatus: number;
  };
  inventoryOverview: {
    categories: string[];
    values: number[];
  };
  compliance: {
    labels: string[];
    values: number[];
  };
}

// const [mockAdminReportData, setMockAdminReportData] = useState<AdminReportData>({
//   summary: {
//     totalInventoryValue: 0,
//     totalItems: 0,
//     newProcurements: 0,
//     reorderStatus: 0,
//   },
//   inventoryOverview: {
//     categories: ["Weapons", "Vehicles", "Electronics", "Uniforms"],
//     values: [200, 50, 100, 150],
//   },
//   compliance: {
//     labels: ["Compliant", "Non-Compliant"],
//     values: [90, 10],
//   },
// });

const AdminInventoryReport: React.FC<AdminReportData> = (adminReportData) => {
  // const adminReportData = mockAdminReportData;

  const downloadReport = () => {
    console.log("Downloading report...");
    // Implement report download logic here

    
  };

  return (
    <div className="admin-inventory-report">
      {/* Header */}
      <div className="header">
        <h1>Admin Inventory Report</h1>
        <button className="download-button" onClick={downloadReport}>
          Download Report
        </button>
      </div>

      {/* Metrics */}
      <div className="metrics">
        <div className="metric-card">
          <h3>Total Inventory Value</h3>
          <p>₹{adminReportData.summary.totalInventoryValue}</p>
        </div>
        <div className="metric-card">
          <h3>Total Items</h3>
          <p>{adminReportData.summary.totalItems}</p>
        </div>
        <div className="metric-card">
          <h3>New Procurements</h3>
          <p>{adminReportData.summary.newProcurements}</p>
        </div>
        <div className="metric-card">
          <h3>Reorder Status</h3>
          <p>{adminReportData.summary.reorderStatus} Items</p>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Section */}
        <div className="left-section">
          <div className="report-table">
            <h3>Inventory Overview</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Items</th>
                </tr>
              </thead>
              <tbody>
                {adminReportData.inventoryOverview.categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category}</td>
                    <td>{adminReportData.inventoryOverview.values[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="report-table">
            <h3>Compliance Overview</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {adminReportData.compliance.labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{adminReportData.compliance.values[index]}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="chart">
            <h3>Inventory Distribution</h3>
            <Bar
  data={{
    labels: adminReportData.inventoryOverview.categories,
    datasets: [
      {
        label: "Total Items",
        data: adminReportData.inventoryOverview.values,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: { size: 10 }, // Adjust font size for mobile
        },
      },
      y: {
        ticks: {
          font: { size: 10 }, // Adjust font size for mobile
        },
      },
    },
  }}
  style={{ maxHeight: "200px" }} // Limit chart height for mobile
/>
          </div>

          <div className="chart">
            <h3>Compliance Status</h3>
            <Pie
  data={{
    labels: adminReportData.compliance.labels,
    datasets: [
      {
        data: adminReportData.compliance.values,
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
  }}
  style={{ maxHeight: "150px" }} // Limit chart height for mobile
/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInventoryReport;
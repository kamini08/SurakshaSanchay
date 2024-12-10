import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);
import "./AdminInventoryReport.css";

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

const AdminInventoryReport: React.FC<AdminReportData> = ({
  summary,
  inventoryOverview,
  compliance,
}) => {
  const downloadReport = () => {
    console.log("Downloading report...");
    const headers = [
      ["Inventory Report"],
      ["Category", "Current Stock"],
      ...inventoryOverview.categories.map((category, index) => [
        category,
        inventoryOverview.values[index],
      ]),
      [],
      ["Compliance Report"],
      ["Category", "Percentage"],
      ...compliance.labels.map((label, index) => [
        label,
        compliance.values[index],
      ]),
    ];
    const csvContent = headers.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Admin_Inventory_Report.csv`;
    link.click();
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
          <p>₹{summary?.totalInventoryValue}</p>
        </div>
        <div className="metric-card">
          <h3>Total Items</h3>
          <p>{summary?.totalItems}</p>
        </div>
        <div className="metric-card">
          <h3>New Procurements</h3>
          <p>{summary?.newProcurements}</p>
        </div>
        {/* Uncomment if needed */}
        {/* <div className="metric-card">
          <h3>Reorder Status</h3>
          <p>{summary.reorderStatus} Items</p>
        </div> */}
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
                {inventoryOverview?.categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category}</td>
                    <td>{inventoryOverview?.values[index]}</td>
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
                {compliance?.labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{compliance?.values[index]}%</td>
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
                labels: inventoryOverview?.categories,
                datasets: [
                  {
                    label: "Total Items",
                    data: inventoryOverview?.values,
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
                labels: compliance?.labels,
                datasets: [
                  {
                    data: compliance?.values,
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

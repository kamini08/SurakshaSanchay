import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./LocalInventoryReport.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

interface DataProps {
  metrics: { label: string; value: number }[];
  inventoryOverview: { category: string; count: number }[];
  maintenanceStatus: { working: number; underRepair: number; outOfOrder: number };
  inventoryReport: { itemId: number; name: string; category: string; currentStock: number }[];
  maintenanceReport: { itemId: number; name: string; issue: string; startDate: string }[];
  discardedItems: { itemId: number; name: string; reason: string; discardedDate: string }[];
}

interface DashboardProps {
  data: DataProps;
}


const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  

  const downloadReport = () => {
    const headers = [
      ["Inventory Report"],
      ["Item ID", "Item Name", "Category", "Current Stock"],
      ...data.inventoryReport.map((row) => [row.itemId, row.name, row.category, row.currentStock]),
      [],
      ["Maintenance Report"],
      ["Item ID", "Item Name", "Issue", "Start Date"],
      ...data.maintenanceReport.map((row) => [row.itemId, row.name, row.issue, row.startDate]),
      [],
      ["Discarded Items"],
      ["Item ID", "Item Name", "Reason", "Discarded Date"],
      ...data.discardedItems.map((row) => [row.itemId, row.name, row.reason, row.discardedDate]),
    ];

    const csvContent = headers.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Full_Report.csv`;
    link.click();
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Police Station Dashboard</h1>
        <div className="button-group">
          
          <button className="download-button" onClick={downloadReport}>
            Download Full Report
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="metrics">
        {data.metrics.map((metric, index) => (
          <div className="metric-card" key={index}>
            <h3>{metric.label}</h3>
            <p>{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        <div className="left-section">
          <ReportTable
            title="Inventory Report"
            headers={["Item ID", "Item Name", "Category", "Current Stock"]}
            data={data.inventoryReport}
            dataKeys={["itemId", "name", "category", "currentStock"]}
          />

          <ReportTable
            title="Maintenance Report"
            headers={["Item ID", "Item Name", "Issue", "Start Date"]}
            data={data.maintenanceReport}
            dataKeys={["itemId", "name", "issue", "startDate"]}
          />

          <ReportTable
            title="Discarded Items"
            headers={["Item ID", "Item Name", "Reason", "Discarded Date"]}
            data={data.discardedItems}
            dataKeys={["itemId", "name", "reason", "discardedDate"]}
          />
        </div>

        <div className="right-section">
          <ChartSection
            title="Inventory Overview"
            chartType={Bar} 
            chartData={{
            //   labels: data.inventoryOverview.map((item) => item.category),
            labels: "inventory",
              datasets: [
                {
                  label: "Inventory Count",
                //   data: data.inventoryOverview.map((item) => item.count),
                data: 49,
                  backgroundColor: "rgba(75, 192, 192, 0.8)",
                },
              ],
            }}
          />

          <ChartSection
            title="Maintenance Status"
            chartType={Pie}
            chartData={{
              labels: ["Working", "Under Repair", "Out of Order"],
              datasets: [
                {
                  data: [
                    // data.maintenanceStatus.working,
                    // data.maintenanceStatus.underRepair,
                    // data.maintenanceStatus.outOfOrder,
                    5, 8, 9, // dummy data
                  ],
                  backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

const ReportTable: React.FC<{
  title: string;
  headers: string[];
  data: any[];
  dataKeys: string[];
}> = ({ title, headers, data, dataKeys }) => (
  <div className="report-table">
    <h3>{title}</h3>
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {dataKeys.map((key, colIndex) => (
              <td key={colIndex}>{row[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ChartSection: React.FC<{
  title: string;
  chartType: any;
  chartData: any;
}> = ({ title, chartType: ChartComponent, chartData }) => (
  <div className="chart">
    <h3>{title}</h3>
    <ChartComponent data={chartData} options={{ maintainAspectRatio: true }} />
  </div>
);

export default Dashboard;
"use client";
// import React, { useEffect, useState } from "react";
// import LocalInventoryReport from "@/components/reports/LocalInventoryReport";
import  "@/components/reports/AdminInventoryReport.css";
// import AuditReport from "@/components/reports/AuditReport";
// import SummaryCard from "@/components/reports/SummaryPage";
// import { Box } from "@mui/material";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import fs from "fs";
// import path from "path";
// import { PrismaClient } from "@prisma/client";
// import { auth } from "../../../../auth";
// import { toast } from "react-toastify";

// // const prisma = new PrismaClient();
// // // async function getModelFields() {
// // //   const result = await prisma.$queryRaw<
// // //     Array<{ column_name: string }>
// // //   >`SELECT column_name FROM information_schema.columns WHERE table_name = 'YourTableName'`;

// // //   console.log(result.map(row => row.column_name));
// // // }

// // // getModelFields();

// interface AdminReportData {
//   summary: {
//     totalInventoryValue: number;
//     totalItems: number;
//     newProcurements: number;
//     reorderStatus: number;
//     complianceStatus: string;
//   };
//   inventoryOverview: {
//     categories: string[];
//     values: number[];
//   };
//   financialSummary: {
//     categories: string[];
//     values: number[];
//   };
//   compliance: {
//     labels: string[];
//     values: number[];
//   };
// }

// const Reports: React.FC = () => {
//   const [totalItems, setTotalItems] = useState(0);
//   const [damagedItems, setDamagedItems] = useState(0);
//   const [workingItems, setWorkingItems] = useState(0);
//   const [adminData, setAdminData] = useState<AdminReportData>({
//     summary: {
//       totalInventoryValue: 0,
//       totalItems: 0,
//       newProcurements: 0,
//       reorderStatus: 0,
//       complianceStatus: "",
//     },
//     inventoryOverview: {
//       categories: [],
//       values: [],
//     },
//     financialSummary: {
//       categories: [],
//       values: [],
//     },
//     compliance: {
//       labels: [],
//       values: [],
//     },
//   });

//   const [localReportData, setLocalReportData] = useState({
//     metrics: [
//       { label: "", value: 0 },
//       { label: "", value: 0 },
//       { label: "", value: 0 },
//       { label: "", value: 0 },
//     ],
//     inventoryOverview: [
//       { category: "", count: 0 },
//       { category: "", count: 0 },
//       { category: "", count: 0 },
//     ],
//     maintenanceStatus: {
//       working: 0,
//       underRepair: 0,
//       outOfOrder: 0,
//     },
//     inventoryReport: [
//       { itemId: 0, name: "", category: "", currentStock: 0 },
//       { itemId: 0, name: "", category: "", currentStock: 0 },
//       { itemId: 0, name: "", category: "", currentStock: 0 },
//     ],
//     maintenanceReport: [
//       {
//         itemId: 0,
//         name: "",
//         issue: "",
//         startDate: "",
//       },
//       {
//         itemId: 0,
//         name: "",
//         issue: "",
//         startDate: "",
//       },
//     ],
//     discardedItems: [
//       {
//         itemId: 0,
//         name: "",
//         reason: "",
//         discardedDate: "",
//       },
//       {
//         itemId: 0,
//         name: "",
//         reason: "",
//         discardedDate: "",
//       },
//     ],
//   });

//   const [user, setUser] = useState<string>("incharge");

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await fetch("/api/Role", {
//           method: "GET",
//         });
//         const data = await res.json();

//         setUser(data);
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     const fetchData = async () => {
//       try {
//         if (user == "admin") {
//           const response = await fetch("/api/reports/mainInventory", {
//             method: "GET",
//           });
//           if (!response.ok) throw new Error("Failed to fetch data");
//           const result = await response.json();
//           console.log(result);
//           setAdminData(result.formData);
//           setTotalItems(result.totalItems || 0);
//           setDamagedItems(result.damagedItems || 0);
//           setWorkingItems(result.workingItems || 0);
          
//         } else if (user == "incharge") {
//           const response = await fetch("/api/reports/localInventory", {
//             method: "GET",
//           });
//           if (!response.ok) throw new Error("Failed to fetch data");
//           const result = await response.json();
//           setLocalReportData(result);
//           setAdminData(result.formData);
//           console.log(result.formData);
//           setTotalItems(result.totalItems);
//           setDamagedItems(result.damagedItems);
//           setWorkingItems(result.workingItems);
         

//         }
//       } catch (err: any) {
//         alert("Error fetching data: " + err.message);
//         toast.error("Error fetching data", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       }
//     };

//     fetchSession();
//     fetchData();
//   }, [user]);

//   return (
//     <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
//       <Box
//         sx={{
//           display: "flex",
//           gap: 4,
//           flexWrap: "wrap",
//           justifyContent: "center",
//           marginBottom: 4,
//         }}
//       >
//         <SummaryCard title="Total Items" value={totalItems} />
//         <SummaryCard title="Damaged Items" value={damagedItems} />
//         <SummaryCard title="Operational Items" value={workingItems} />

//         {user == "admin" ? (
//           <AdminInventoryReport {...adminData} />
//         ) : (
//           <LocalInventoryReport data={localReportData} />
//         )}
//       </Box>
//     </div>
//   );
// };

// export default Reports;




import React, { useState, useEffect } from "react";
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

interface AdminReportData {
  summary: {
    totalInventoryValue: number;
    totalItems: number;
    newProcurements: number;
    reorderStatus: number;
    complianceStatus: string;
  };
  inventoryOverview: {
    categories: string[];
    values: number[];
  };
  compliance: {
    labels: string[];
    values: number[];
  };
  financialSummary: {
    categories: string[];
    values: number[];
  }
}

const AdminInventoryReport = () => {
  const [data, setData] = useState<AdminReportData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/reports/mainInventory"); // Replace with your API endpoint
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const downloadReport = () => {
    if (!data) return;
    console.log("Downloading report...");
    const headers = [
      ["Inventory Report"],
      ["Category", "Current Stock"],
      ...data.inventoryOverview.categories.map((category, index) => [
        category,
        data.inventoryOverview.values[index],
      ]),
      [],
      ["Compliance Report"],
      ["Category", "Percentage"],
      ...data.compliance.labels.map((label, index) => [
        label,
        data.compliance.values[index],
      ]),
    ];
    const csvContent = headers.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Admin_Inventory_Report.csv`;
    link.click();
  };

  if (!data) return <div>Loading...</div>;

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
          <p>{data.summary.totalInventoryValue*10000}</p>
        </div>
        <div className="metric-card">
          <h3>Total Items</h3>
          <p>{data.summary.totalItems}</p>
        </div>
        <div className="metric-card">
          <h3>New Procurements</h3>
          <p>{data.summary.newProcurements}</p>
        </div>
        <div className="metric-card">
          <h3>Reorder Status</h3>
          <p>{data.summary.reorderStatus} Items</p>
        </div>
        <div className="metric-card">
          <h3>Compliance Status</h3>
          <p>{data.summary.complianceStatus}</p>
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
                {data.inventoryOverview.categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category}</td>
                    <td>{data.inventoryOverview.values[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="report-table">
            <h3>Financial Summary</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Value</th>
                </tr>
              </thead>
              <tbody>
                {data.financialSummary.categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category}</td>
                    <td>₹{data.financialSummary.values[index]}</td>
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
                {data.compliance.labels.map((label, index) => (
                  <tr key={index}>
                    <td>{label}</td>
                    <td>{data.compliance.values[index]}%</td>
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
                labels: data.inventoryOverview.categories,
                datasets: [
                  {
                    label: "Total Items",
                    data: data.inventoryOverview.values,
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
                labels: data.compliance.labels,
                datasets: [
                  {
                    data: data.compliance.values,
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

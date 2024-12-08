"use client";
import React, { useEffect, useState } from "react";
import LocalInventoryReport from "@/components/reports/LocalInventoryReport";
import AdminInventoryReport from "@/components/reports/AdminInventoryReport";
import AuditReport from "@/components/reports/AuditReport";
import SummaryCard from "@/components/reports/SummaryPage";
import { Box } from "@mui/material";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
<<<<<<< HEAD
import { auth } from "../../../../auth";


interface CompliancePolicy {
  policy: string;
  status: string;
  percentage: number;
}

interface ValuationCategory {
  categories: string[];
  accuracy: number[];
}

interface Finding {
  category: string;
  finding: string;
  impact: string;
  recommendation: string;
}


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
    financialSummary: {
      categories: string[];
      values: number[];
    };
    compliance: {
      labels: string[];
      values: number[];
    };
  }



const ReportsPage: React.FC = () => {

  
  const [complianceData, setComplianceData] = useState<{
    policies: CompliancePolicy[];
    complianceOverview: number[];
    labels: string[];
  }>({
    policies: [
      { policy: "Procurement Policies", status: "Compliant", percentage: 90 },
      { policy: "Storage Policies", status: "Partially Compliant", percentage: 70 },
      { policy: "Usage and Deployment Policies", status: "Compliant", percentage: 85 },
      { policy: "Disposal Policies", status: "Non-Compliant", percentage: 60 },
    ],
    complianceOverview: [90, 70, 85, 60],
    labels: ["Procurement", "Storage", "Usage & Deployment", "Disposal"],
  });
  
  const [valuationData, setValuationData] = useState<{
    categories: string[];
    accuracy: number[];
  }>({
    categories: ["Specialized Equipment", "Operational Assets", "Government-Funded Items"],
    accuracy: [95, 80, 88],
  });
  const [user, setUser] = useState("user");
  const [keyFindings, setKeyFindings] = useState<Finding[]>([
    {
      category: "Storage Policies",
      finding: "Improper storage of arms",
      impact: "Risk of theft or misuse",
      recommendation: "Upgrade storage facilities and implement stricter access controls",
    },
    {
      category: "Procurement Policies",
      finding: "Procurement through unapproved vendors",
      impact: "Violation of government protocols",
      recommendation: "Restrict procurement to approved vendors and audit regularly",
    },
  ]);
  const [totalItems, setTotalItems] = useState(0);
  const [damagedItems, setDamagedItems] = useState(0);
  const [workingItems, setWorkingItems] = useState(0);


  const [data, setData] = useState<any>({
    complianceData,
    valuationData,
    keyFindings,
    totalItems,
    damagedItems,
    workingItems
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await auth();
        if(session?.user) {
        setUser(session.user.role);
        }
      } catch(e) {
        console.error(e);
      }
    }
    const fetchData = async () => {
      try {
        if(user=="admin") {
        const response = await fetch("/api/reports/audit", {
          method: "GET",
        }); 
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
        setTotalItems(result.totalItems);
        setDamagedItems(result.damagedItems);
        setWorkingItems(result.workingItems);
      
      } 
      } catch (err: any) {
        alert(
          "Error fetching data: " + err.message
        );
      }
    };

    
    fetchSession();
    fetchData();
  }, []);

  return (
    <DefaultLayout>
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginBottom: 4 }}>
        <SummaryCard title="Total Items" value={totalItems} />
        <SummaryCard title="Damaged Items" value={damagedItems} />
        <SummaryCard title="Operational Items" value={workingItems} />
      </Box>
      <AuditReport {...data}></AuditReport>
    </Box>
    </DefaultLayout>
=======
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

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
  financialSummary: {
    categories: string[];
    values: number[];
  };
  compliance: {
    labels: string[];
    values: number[];
  };
}

//   const [adminReportData, setAdminReportData] = useState<AdminReportData>({
//     summary: {
//       totalInventoryValue: 500000,
//       totalItems: 1500,
//       newProcurements: 45,
//       reorderStatus: 12,
//       complianceStatus: "95%",
//     },
//     inventoryOverview: {
//       categories: ["Arms & Ammunition", "Vehicles", "Equipment", "Consumables"],
//       values: [120, 50, 65, 300],
//     },
//     financialSummary: {
//       categories: ["Arms and Ammunition", "Vehicles", "Miscellaneous"],
//       values: [750000, 1000000, 100000],
//     },
//     compliance: {
//       labels: ["Compliant", "Non-Compliant"],
//       values: [90, 10],
//     },
//   });

//   const [localReportData, setLocalReportData] = useState({
//     metrics: [
//       { label: "Total Devices", value: 155 },
//       { label: "Working Devices", value: 120 },
//       { label: "Under Repair", value: 15 },
//       { label: "Out of Order", value: 5 },
//     ],
//     inventoryOverview: [
//       { category: "Desktops", count: 50 },
//       { category: "Smartphones", count: 40 },
//       { category: "Tablets", count: 10 },
//     ],
//     maintenanceStatus: {
//       working: 86,
//       underRepair: 11,
//       outOfOrder: 3,
//     },
//     inventoryReport: [
//       { itemId: 1, name: "Desktop", category: "Computers", currentStock: 50 },
//       { itemId: 2, name: "Smartphone", category: "Mobiles", currentStock: 40 },
//       { itemId: 3, name: "Tablet", category: "Tablets", currentStock: 10 },
//     ],
//     maintenanceReport: [
//       { itemId: 1, name: "Desktop", issue: "Hardware Failure", startDate: "2024-11-20" },
//       { itemId: 2, name: "Smartphone", issue: "Screen Damage", startDate: "2024-11-22" },
//     ],
//     discardedItems: [
//       { itemId: 1, name: "Printer", reason: "Outdated", discardedDate: "2024-10-15" },
//       { itemId: 2, name: "Monitor", reason: "Damaged", discardedDate: "2024-11-05" },
//     ],
//   });

const ReportsPage: React.FC = () => {
  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Box sx={{ padding: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 4,
          }}
        >
          <SummaryCard title="Total Items" value={200} />
          <SummaryCard title="Damaged Items" value={15} />
          <SummaryCard title="Operational Items" value={175} />
        </Box>
        <AuditReport></AuditReport>
      </Box>
    </div>
>>>>>>> 36e4f86dda7906b162abd7f3ec1e70abb7cf3ac7
  );
};

export default ReportsPage;
<<<<<<< HEAD

function setUser(role: any) {
  throw new Error("Function not implemented.");
}
=======
>>>>>>> 36e4f86dda7906b162abd7f3ec1e70abb7cf3ac7

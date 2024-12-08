"use client";
import React, { useEffect, useState } from "react";
import LocalInventoryReport from "@/components/reports/LocalInventoryReport";
import AdminInventoryReport from "@/components/reports/AdminInventoryReport";
import AuditReport from "@/components/reports/AuditReport";
import SummaryCard from "@/components/reports/SummaryPage";
import { Box } from "@mui/material";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { auth } from "../../../../auth";

// const prisma = new PrismaClient();
// // async function getModelFields() {
// //   const result = await prisma.$queryRaw<
// //     Array<{ column_name: string }>
// //   >`SELECT column_name FROM information_schema.columns WHERE table_name = 'YourTableName'`;

// //   console.log(result.map(row => row.column_name));
// // }

// // getModelFields();

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

<<<<<<< HEAD
  const [totalItems, setTotalItems] = useState(0);
  const [damagedItems, setDamagedItems] = useState(0);
  const [workingItems, setWorkingItems] = useState(0);

=======
const ReportsPage: React.FC = () => {
>>>>>>> 36e4f86dda7906b162abd7f3ec1e70abb7cf3ac7
  const [adminData, setAdminData] = useState<AdminReportData>({
    summary: {
      totalInventoryValue: 500000,
      totalItems: 1500,
      newProcurements: 45,
      reorderStatus: 12,
      complianceStatus: "95%",
    },
    inventoryOverview: {
      categories: ["Arms & Ammunition", "Vehicles", "Equipment", "Consumables"],
      values: [120, 50, 65, 300],
    },
    financialSummary: {
      categories: ["Arms and Ammunition", "Vehicles", "Miscellaneous"],
      values: [750000, 1000000, 100000],
    },
    compliance: {
      labels: ["Compliant", "Non-Compliant"],
      values: [90, 10],
    },
  });

  const [localReportData, setLocalReportData] = useState({
    metrics: [
      { label: "Total Devices", value: 155 },
      { label: "Working Devices", value: 120 },
      { label: "Under Repair", value: 15 },
      { label: "Out of Order", value: 5 },
    ],
    inventoryOverview: [
      { category: "Desktops", count: 50 },
      { category: "Smartphones", count: 40 },
      { category: "Tablets", count: 10 },
    ],
    maintenanceStatus: {
      working: 86,
      underRepair: 11,
      outOfOrder: 3,
    },
    inventoryReport: [
      { itemId: 1, name: "Desktop", category: "Computers", currentStock: 50 },
      { itemId: 2, name: "Smartphone", category: "Mobiles", currentStock: 40 },
      { itemId: 3, name: "Tablet", category: "Tablets", currentStock: 10 },
    ],
    maintenanceReport: [
      {
        itemId: 1,
        name: "Desktop",
        issue: "Hardware Failure",
        startDate: "2024-11-20",
      },
      {
        itemId: 2,
        name: "Smartphone",
        issue: "Screen Damage",
        startDate: "2024-11-22",
      },
    ],
    discardedItems: [
      {
        itemId: 1,
        name: "Printer",
        reason: "Outdated",
        discardedDate: "2024-10-15",
      },
      {
        itemId: 2,
        name: "Monitor",
        reason: "Damaged",
        discardedDate: "2024-11-05",
      },
    ],
  });

  const [user, setUser] = useState<string>("incharge");


  useEffect(() => {
    const fetchSession = async () => {
      try {
        const session = await auth();
        if (session?.user) {
          setUser(session.user.role);
        }
      } catch (e) {
        console.error(e);
      }
<<<<<<< HEAD
    }
    const fetchData = async () => {
      try {
        if(user=="admin") {
        const response = await fetch("/api/reports/mainInventory", {
          method: "GET",
        }); 
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setAdminData(result.formData);
        setTotalItems(result.totalItems);
        setDamagedItems(result.damagedItems);
        setWorkingItems(result.workingItems);
      
      } else if(user=="incharge") {

        const response = await fetch("/api/reports/localInventory", {
          method: "GET",
        }); 
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setLocalReportData(result);
  setAdminData(result.formData);
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

    
=======
    };
>>>>>>> 36e4f86dda7906b162abd7f3ec1e70abb7cf3ac7
    fetchSession();
    fetchData();
  }, []);
<<<<<<< HEAD


  return (
    <DefaultLayout>
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginBottom: 4 }}>
        <SummaryCard title="Total Items" value={totalItems} />
        <SummaryCard title="Damaged Items" value={damagedItems} />
        <SummaryCard title="Operational Items" value={workingItems} />
=======

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
        {user == "admin" ? (
          <AdminInventoryReport {...adminData} />
        ) : (
          <LocalInventoryReport data={localReportData} />
        )}
>>>>>>> 36e4f86dda7906b162abd7f3ec1e70abb7cf3ac7
      </Box>
    </div>
  );
};

export default ReportsPage;

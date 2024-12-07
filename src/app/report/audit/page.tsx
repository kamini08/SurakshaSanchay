"use client"
import React, { useEffect, useState } from "react";
import LocalInventoryReport from "@/components/reports/LocalInventoryReport";
import AdminInventoryReport from "@/components/reports/AdminInventoryReport";
import AuditReport from "@/components/reports/AuditReport";
import SummaryCard from "@/components/reports/SummaryPage";
import { Box } from "@mui/material";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import fs from 'fs';
import path from 'path';
import { PrismaClient } from "@prisma/client";


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

const ReportsPage: React.FC = () => {

  const [data, setData] = useState<any>();

  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch("/api/report/audit", {
          method: "GET",
        }); // Replace with your API endpoint
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData({complianceData, valuationData, keyFindings});
      } catch (err: any) {
        alert(
          "Error fetching data: " + err.message
        )
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <DefaultLayout>
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center", marginBottom: 4 }}>
        <SummaryCard title="Total Items" value={200} />
        <SummaryCard title="Damaged Items" value={15} />
        <SummaryCard title="Operational Items" value={175} />
      </Box>
      <AuditReport {...data}></AuditReport>
    </Box>
    </DefaultLayout>
  );
};

export default ReportsPage;
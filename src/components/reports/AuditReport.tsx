import React, { useEffect } from "react";
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
import "./AuditReport.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
);

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

interface ComplianceData {
  policies: CompliancePolicy[];
  complianceOverview: number[];
  labels: string[];
}

const AuditReport: React.FC<{
  complianceData: ComplianceData;
  valuationData: ValuationCategory;
  keyFindings: Finding[];
}> = ({ complianceData, valuationData, keyFindings }) => {
  return (
    <div className="policy-compliance-review">
      <div className="header">
        <h1>Audit Report</h1>
      </div>

      {/* Main Layout */}
      <div className="main-layout">
        {/* Left Section */}
        <div className="left-section">
          <ReportTable
            title="Compliance Overview"
            headers={["Policy", "Status", "Compliance Percentage"]}
            data={complianceData?.policies}
            dataKeys={["policy", "status", "percentage"]}
          />

          <ReportTable
            title="Stock Valuation Accuracy"
            headers={["Category", "Accuracy Percentage"]}
            data={valuationData?.categories.map((category, index) => ({
              category,
              accuracy: `${valuationData?.accuracy[index]}%`,
            }))}
            dataKeys={["category", "accuracy"]}
          />
        </div>

        {/* Right Section */}
        <div className="right-section">
          <ChartSection
            title="Policy Compliance Distribution"
            chartType={Pie}
            chartData={{
              labels: complianceData?.labels,
              datasets: [
                {
                  data: complianceData?.complianceOverview,
                  backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336"],
                },
              ],
            }}
          />

          <ChartSection
            title="Stock Valuation Accuracy"
            chartType={Bar}
            chartData={{
              labels: valuationData?.categories,
              datasets: [
                {
                  label: "Accuracy Percentage",
                  data: valuationData?.accuracy,
                  backgroundColor: "rgba(75, 192, 192, 0.8)",
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Key Findings Section */}
      <section className="findings-section">
        <h2>Key Findings</h2>
        {keyFindings?.map((finding, index) => (
          <div className="finding-card" key={index}>
            <h3>{finding?.category}</h3>
            <p>
              <strong>Finding:</strong> {finding?.finding}
            </p>
            <p>
              <strong>Impact:</strong> {finding?.impact}
            </p>
            <p>
              <strong>Recommendation:</strong> {finding?.recommendation}
            </p>
          </div>
        ))}
      </section>
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
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {dataKeys?.map((key, colIndex) => (
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

export default AuditReport;

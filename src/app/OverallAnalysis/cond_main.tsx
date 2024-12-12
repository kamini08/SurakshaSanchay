'use client';
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataEntry {
  Condition: string;
  Average_Maintenance_Charge: number;
}

const ConditionWiseChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DataEntry[] = await response.json();

        // Calculate average maintenance charge per condition
        const conditionCharges: Record<string, { total: number; count: number }> =
          {};
        data.forEach((item) => {
          if (!conditionCharges[item.Condition]) {
            conditionCharges[item.Condition] = { total: 0, count: 0 };
          }
          conditionCharges[item.Condition].total +=
            item.Average_Maintenance_Charge;
          conditionCharges[item.Condition].count += 1;
        });

        const averagedData = Object.keys(conditionCharges).map((condition) => ({
          condition,
          average:
            conditionCharges[condition].total /
            conditionCharges[condition].count,
        }));

        setChartData({
          labels: averagedData.map((entry) => entry.condition),
          datasets: [
            {
              label: "Average Maintenance Cost",
              data: averagedData.map((entry) => entry.average),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Condition",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Average Maintenance Cost",
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4">Condition-wise Average Maintenance Cost</h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ConditionWiseChart;

'use client'
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataEntry {
  id: number;
  Location: string;
  Category: string;
  Quantity: number;
  Condition: string;
  Average_Maintenance_Charge: number;
  "Item_Age(years)": number;
  "Return_Duration(days)rs)": number;
  Price: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const ChartPage: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");

        const text = await response.text();
        console.log("Raw Response:", text); // Debug log

        if (!text.trim()) {
          throw new Error("The JSON file is empty.");
        }

        const data: DataEntry[] = JSON.parse(text);

        const categoryTotals = data.reduce<Record<string, number>>((acc, item) => {
          acc[item.Category] = (acc[item.Category] || 0) + item.Quantity;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Total Quantity",
              data: Object.values(categoryTotals),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching the JSON data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Category-wise Total Quantity</h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChartPage;
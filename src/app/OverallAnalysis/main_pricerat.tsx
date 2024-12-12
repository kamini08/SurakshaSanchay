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
  Category: string;
  Average_Maintenance_Charge: number;
  Price: number;
}

const MaintenancePriceRatioChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DataEntry[] = await response.json();

        // Calculate maintenance price ratio per category
        const categoryRatios: Record<
          string,
          { totalMaintenance: number; totalPrice: number; count: number }
        > = {};
        data.forEach((item) => {
          if (!categoryRatios[item.Category]) {
            categoryRatios[item.Category] = { totalMaintenance: 0, totalPrice: 0, count: 0 };
          }
          categoryRatios[item.Category].totalMaintenance += item.Average_Maintenance_Charge;
          categoryRatios[item.Category].totalPrice += item.Price;
          categoryRatios[item.Category].count += 1;
        });

        const ratioData = Object.keys(categoryRatios).map((category) => {
          const { totalMaintenance, totalPrice, count } = categoryRatios[category];
          const averageMaintenance = totalMaintenance / count;
          const averagePrice = totalPrice / count;
          const ratio = averagePrice !== 0 ? averageMaintenance / averagePrice : 0; // Avoid division by zero

          return {
            category,
            ratio,
          };
        });

        setChartData({
          labels: ratioData.map((entry) => entry.category),
          datasets: [
            {
              label: "Maintenance Price Ratio",
              data: ratioData.map((entry) => entry.ratio),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
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
        title: {
          display: true,
          text: "Category",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Maintenance Price Ratio",
        },
      },
    },
  };

  return (
    <div>
      <h1>Category-wise Maintenance Price Ratio</h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MaintenancePriceRatioChart;

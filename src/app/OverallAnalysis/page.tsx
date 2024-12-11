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

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataEntry {
  Location: string;
  Average_Maintenance_Charge: number;
  Price: number; // Assuming Price is also part of the data
}

const LocationWiseChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DataEntry[] = await response.json();

        // Calculate maintenance-to-price ratio per location
        const locationRatios: Record<string, { totalMaintenance: number; totalPrice: number; count: number }> = {};
        data.forEach((item) => {
          if (!locationRatios[item.Location]) {
            locationRatios[item.Location] = { totalMaintenance: 0, totalPrice: 0, count: 0 };
          }
          locationRatios[item.Location].totalMaintenance += item.Average_Maintenance_Charge;
          locationRatios[item.Location].totalPrice += item.Price;
          locationRatios[item.Location].count += 1;
        });

        const averagedData = Object.keys(locationRatios).map((location) => {
          const { totalMaintenance, totalPrice, count } = locationRatios[location];
          const averageMaintenance = totalMaintenance / count;
          const averagePrice = totalPrice / count;
          const maintenanceToPriceRatio = averagePrice !== 0 ? averageMaintenance / averagePrice : 0; // Avoid division by zero

          return {
            location,
            ratio: maintenanceToPriceRatio,
          };
        });

        setChartData({
          labels: averagedData.map((entry) => entry.location),
          datasets: [
            {
              label: "Maintenance to Price Ratio",
              data: averagedData.map((entry) => entry.ratio),
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
          text: "Location",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Maintenance to Price Ratio",
        },
      },
    },
  };

  return (
    <div>
      <h1>Location-wise Maintenance to Price Ratio</h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LocationWiseChart;
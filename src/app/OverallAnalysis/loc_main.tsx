// 'use client';
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface DataEntry {
//   Location: string;
//   Average_Maintenance_Charge: number;
//   Price: number; // Assuming Price is also part of the data
// }

// const LocationWiseChart: React.FC = () => {
//   const [chartData, setChartData] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/data.json");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data: DataEntry[] = await response.json();

//         // Calculate maintenance-to-price ratio per location
//         const locationRatios: Record<string, { totalMaintenance: number; totalPrice: number; count: number }> = {};
//         data.forEach((item) => {
//           if (!locationRatios[item.Location]) {
//             locationRatios[item.Location] = { totalMaintenance: 0, totalPrice: 0, count: 0 };
//           }
//           locationRatios[item.Location].totalMaintenance += item.Average_Maintenance_Charge;
//           locationRatios[item.Location].totalPrice += item.Price;
//           locationRatios[item.Location].count += 1;
//         });

//         const ratioData = Object.keys(locationRatios).map((location) => ({
//           location,
//           ratio: locationRatios[location].totalMaintenance / locationRatios[location].totalPrice,
//         }));

//         setChartData({
//           labels: ratioData.map((entry) => entry.location),
//           datasets: [
//             {
//               label: "Maintenance to Price Ratio",
//               data: ratioData.map((entry) => entry.ratio),
//               backgroundColor: "rgba(75, 192, 192, 0.6)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching or processing data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         beginAtZero: true,
//         title: {
//           display: true,
//           text: "Maintenance to Price Ratio",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Location",
//         },
//       },
//     },
//   };

//   return (
//     <div>
//       <h1>Location-wise Maintenance to Price Ratio</h1>
//       {chartData ? (
//         <Bar data={chartData} options={options} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default LocationWiseChart;
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
  Location: string;
  Average_Maintenance_Charge: number;
}

const StackedBarChart: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: DataEntry[] = await response.json();

        // Group data by Location
        const groupedData: Record<string, number> = {};

        data.forEach((item) => {
          if (!groupedData[item.Location]) {
            groupedData[item.Location] = 0;
          }
          groupedData[item.Location] += item.Average_Maintenance_Charge;
        });

        const locations = Object.keys(groupedData);

        const datasets = [
          {
            label: "Average Maintenance Charge",
            data: locations.map((location) => groupedData[location]),
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
              Math.random() * 255,
            )}, ${Math.floor(Math.random() * 255)}, 0.6)`,
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
          },
        ];

        setChartData({
          labels: locations,
          datasets,
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
      }
    };

    fetchData();
  }, []);

  const indexAxis: 'x' | 'y' = 'y';

  const options = {
    responsive: true,
    indexAxis,
    plugins: {
      tooltip: {
        mode: "index" as const, // Use the expected literal type
        intersect: false,
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Average Maintenance Charge",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Location",
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold mb-4">Location-wise Average Maintenance Charge</h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StackedBarChart;
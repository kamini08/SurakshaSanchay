// 'use client'
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// // Register the components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface DataEntry {
//   id: number;
//   Location: string;
//   Category: string;
//   Quantity: number;
//   Condition: string;
//   Average_Maintenance_Charge: number;
//   "Item_Age(years)": number;
//   "Return_Duration(days)rs)": number;
//   Price: number;
// }

// interface ChartData {
//   labels: string[];
//   datasets: {
//     label: string;
//     data: number[];
//     backgroundColor: string;
//     borderColor: string;
//     borderWidth: number;
//   }[];
// }

// const ChartPage: React.FC = () => {
//   const [chartData, setChartData] = useState<ChartData | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/data.json");

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const text = await response.text();
//         if (!text.trim()) {
//           throw new Error("The JSON file is empty.");
//         }

//         const data: DataEntry[] = JSON.parse(text);

//         // Group data by Category and calculate total price and maintenance cost
//         const categoryTotals = data.reduce<Record<string, { totalPrice: number; totalMaintenance: number }>>((acc, item) => {
//           if (!acc[item.Category]) {
//             acc[item.Category] = { totalPrice: 0, totalMaintenance: 0 };
//           }
//           acc[item.Category].totalPrice += item.Price;
//           acc[item.Category].totalMaintenance += item.Average_Maintenance_Charge;
//           return acc;
//         }, {});

//         // Prepare the data for the chart
//         setChartData({
//           labels: Object.keys(categoryTotals),
//           datasets: [
//             {
//               label: "Total Buy Price",
//               data: Object.values(categoryTotals).map((totals) => totals.totalPrice),
//               backgroundColor: "rgba(54, 162, 235, 0.6)",
//               borderColor: "rgba(54, 162, 235, 1)",
//               borderWidth: 1,
//             },
//             {
//               label: "Total Maintenance Cost",
//               data: Object.values(categoryTotals).map((totals) => totals.totalMaintenance),
//               backgroundColor: "rgba(255, 159, 64, 0.6)",
//               borderColor: "rgba(255, 159, 64, 1)",
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching the JSON data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     responsive: true,
//     scales: {
//       x: {
//         stacked: true, // Enable stacking on the X-axis
//       },
//       y: {
//         stacked: true, // Enable stacking on the Y-axis
//         beginAtZero: true,
//       },
//     },
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       tooltip: {
//         mode: "index",
//         intersect: false,
//       },
//     },
//   };

//   return (
//     <div>
//       <h1>Spending Distribution by Category</h1>
//       {chartData ? (
//         <Bar data={chartData} options={options} />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default ChartPage;
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

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        if (!text.trim()) {
          throw new Error("The JSON file is empty.");
        }

        const data: DataEntry[] = JSON.parse(text);

        // Group data by Category and calculate total price and maintenance cost
        const categoryTotals = data.reduce<Record<string, { totalPrice: number; totalMaintenance: number }>>((acc, item) => {
          if (!acc[item.Category]) {
            acc[item.Category] = { totalPrice: 0, totalMaintenance: 0 };
          }
          acc[item.Category].totalPrice += item.Price;
          acc[item.Category].totalMaintenance += item.Average_Maintenance_Charge;
          return acc;
        }, {});

        // Prepare the data for the chart
        setChartData({
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Total Buy Price",
              data: Object.values(categoryTotals).map((totals) => totals.totalPrice),
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
            {
              label: "Total Maintenance Cost",
              data: Object.values(categoryTotals).map((totals) => totals.totalMaintenance),
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
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
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Categories",
          color: "#000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Cost (in units)",
          color: "#000",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Spending Distribution by Category",
        color: "#000",
        font: {
          size: 20,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>
        Spending Analysis
      </h1>
      {chartData ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ChartPage;


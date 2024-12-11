// 'use client';
// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto";

// const App = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Fetch data from the JSON file
//     const fetchData = async () => {
//       try {
//         const response = await fetch("C:\\Users\\Lenovo\\Desktop\\SIH_SurakshaSanchay\\src\\app\\OverallAnalysis\\csvjson.json"); // Ensure the file is in the public folder
//         const data = await response.json();

//         // Group data by category and sum the quantities
//         const categoryQuantities = data.reduce((acc, item) => {
//           acc[item.Category] = (acc[item.Category] || 0) + item.Quantity;
//           return acc;
//         }, {});

//         const categories = Object.keys(categoryQuantities);
//         const quantities = Object.values(categoryQuantities);

//         setChartData({
//           labels: categories,
//           datasets: [
//             {
//               label: "Total Quantity",
//               data: quantities,
//               backgroundColor: "skyblue",
//               borderColor: "black",
//               borderWidth: 1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!chartData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ width: "80%", margin: "auto" }}>
//       <h2>Category-wise Total Quantity</h2>
//       <Bar
//         data={chartData}
//         options={{
//           responsive: true,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             title: {
//               display: true,
//               text: "Category-wise Total Quantity",
//             },
//           },
//           scales: {
//             x: {
//               ticks: {
//                 font: { size: 12 },
//               },
//             },
//             y: {
//               ticks: {
//                 font: { size: 12 },
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default App;
export default function NotFound(){
  return <div  className="w-full h-screen text-center text-6xl bg-black text-white pt-96" ><h2>404 | This page could not be found</h2></div>;
}
// 'use client';
// import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";
// import React, { useEffect, useState } from 'react';
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label,
// } from 'recharts';

// const formatNumber = (num: number): string => {
//   return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
// };

// const ChartComponent = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/get_chart_data')
//       .then((response) => response.json())
//       .then((data) => {
//         const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
//           actualPrice: actualPrice / 1_000_000, // Scaling down to millions
//           predictedPrice: data.y_pred[index] / 1_000_000,
//         }));
//         setChartData(formattedData);
//       })
//       .catch((error) => console.error('Error fetching chart data:', error));
//   }, []);

//   return (
//     <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
//       <Breadcrumb pageName="ML MODEL PREDICTIONS" />
//     <div className="flex justify-center items-center min-h-screen bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm font-medium text-black dark:text-white">
//         <h2 className="text-xl font-semibold text-center text-gray-800 mb-4 text-sm font-medium text-black dark:text-white">
//           Actual Prices vs Predicted Prices
//         </h2>
//         <ResponsiveContainer width="100%" height={350}>
//           <ScatterChart>
//             <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//             <XAxis
//               type="number"
//               dataKey="actualPrice"
//               name="Actual Price"
//               tick={{ fontSize: 12, fill: '#333' }}
//               stroke="#333"
//             >
//               <Label
//                 value="Actual Price (₹ in Millions)"
//                 offset={-5}
//                 position="insideBottom"
//                 style={{ fill: '#333', fontSize: '14px' }}
//               />
//             </XAxis>
//             <YAxis
//               type="number"
//               dataKey="predictedPrice"
//               name="Predicted Price"
//               tick={{ fontSize: 12, fill: '#333' }}
//               stroke="#333"
//             >
//               <Label
//                 value="Predicted Price (₹ in Millions)"
//                 angle={-90}
//                 position="insideLeft"
//                 style={{ fill: '#333', fontSize: '14px', textAnchor: 'middle' }}
//               />
//             </YAxis>
//             <Tooltip
//               formatter={(value: number) => formatNumber(value * 1_000_000)} // Revert scaling for display
//               cursor={{ strokeDasharray: '3 3' }}
//             />
//             <Scatter
//               name="Price Prediction"
//               data={chartData}
//               fill="#34D399"
//               line={{ stroke: '#10B981', strokeWidth: 2 }}
//               shape="circle"
//             />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default ChartComponent;
"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const formatNumber = (num: number): string => {
  return num.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};

const ChartComponent = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_chart_data")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.y_test.map(
          (actualPrice: number, index: number) => ({
            actualPrice: actualPrice / 1_000_000, // Scaling down to millions
            predictedPrice: data.y_pred[index] / 1_000_000,
          }),
        );
        setChartData(formattedData);
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

  return (
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ML MODEL PREDICTIONS" />
      <div className="flex min-h-screen items-center justify-center bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="w-full max-w-4xl rounded-lg bg-white p-6 text-sm font-medium text-black shadow-lg dark:border-strokedark dark:bg-boxdark dark:text-white">
          <h2 className="mb-4 text-center text-xl font-semibold text-black dark:text-white">
            Actual Prices vs Predicted Prices
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis
                type="number"
                dataKey="actualPrice"
                name="Actual Price"
                tick={{
                  fontSize: 12,
                  className: "text-black dark:text-white text-center",
                }}
              >
                <Label
                  className="text-center text-black dark:text-white"
                  value="Actual Price (₹ in Millions)"
                  offset={-5}
                  position="insideBottom"
                  style={{ fontSize: "14px" }}
                />
              </XAxis>
              <YAxis
                type="number"
                dataKey="predictedPrice"
                name="Predicted Price"
                tick={{
                  fontSize: 12,
                  className: "text-black dark:text-white text-center",
                }}
              >
                <Label
                  className="text-center text-black dark:text-white"
                  value="Predicted Price (₹ in Millions)"
                  angle={-90}
                  position="insideLeft"
                  style={{ fontSize: "14px", textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip
                formatter={(value: number) => formatNumber(value * 1_000_000)} // Revert scaling for display
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Scatter
                name="Price Prediction"
                data={chartData}
                fill="#34D399"
                line={{ stroke: "#10B981", strokeWidth: 2 }}
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;

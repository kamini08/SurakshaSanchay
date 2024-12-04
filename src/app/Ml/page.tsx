


// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const ChartComponent = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/get_chart_data')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         // Combine y_test and y_pred data into a single array for Recharts
//         const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
//           name: `Point ${index + 1}`,
//           actualPrice,
//           predictedPrice: data.y_pred[index],
//         }));
//         setChartData(formattedData);
//       })
//       .catch((error) => {
//         console.error('Error fetching chart data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Actual Prices vs Predicted Prices</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {/* Line for actual prices (solid line) */}
//           <Line
//             type="monotone"
//             dataKey="actualPrice"
//             stroke="#0000FF"  // Blue color for actual prices
//             strokeWidth={3}   // Increased thickness for visibility
//             activeDot={{ r: 6 }}  // Larger active dot for better visibility
//           />
//           {/* Line for predicted prices (yellow dashed line) */}
//           <Line
//             type="monotone"
//             dataKey="predictedPrice"
//             stroke="#FF0000"  
//             strokeWidth={3}   // Increased thickness for visibility
//             activeDot={{ r: 6 }}  // Larger active dot for better visibility
//             strokeDasharray="5 5" // Dashed line for predicted prices
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartComponent;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// const ChartComponent = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/get_chart_data')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         // If actual and predicted prices should be exactly equal for a 45-degree line
//         const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
//           name: `Point ${index + 1}`,
//           actualPrice,
//           predictedPrice: actualPrice,  // Enforcing a perfect match for 45-degree line
//         }));
//         setChartData(formattedData);
//       })
//       .catch((error) => {
//         console.error('Error fetching chart data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Actual Prices vs Predicted Prices</h2>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={chartData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           {/* Line for actual prices (solid line) */}
//           <Line
//             type="monotone"
//             dataKey="actualPrice"
//             stroke="#0000FF"  // Blue color for actual prices
//             strokeWidth={3}   // Increased thickness for visibility
//             activeDot={{ r: 6 }}  // Larger active dot for better visibility
//           />
//           {/* Line for predicted prices (yellow dashed line) */}
//           <Line
//             type="monotone"
//             dataKey="predictedPrice"
//             stroke="#FFD700"  // Yellow color for predicted prices
//             strokeWidth={3}   // Increased thickness for visibility
//             activeDot={{ r: 6 }}  // Larger active dot for better visibility
//             strokeDasharray="5 5" // Dashed line for predicted prices
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default ChartComponent;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Label
// } from 'recharts';

// const ChartComponent = () => {
//   const [chartData, setChartData] = useState<any[]>([]);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/get_chart_data')
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         // Format the data to map actualPrice on X-axis and predictedPrice on Y-axis
//         const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
//           actualPrice,
//           predictedPrice: data.y_pred[index],  // Assuming data.y_pred contains the predicted prices
//         }));
//         setChartData(formattedData);
//       })
//       .catch((error) => {
//         console.error('Error fetching chart data:', error);
//       });
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
//         <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Actual Prices vs Predicted Prices</h2>
//         <ResponsiveContainer width="100%" height={350}>
//           <ScatterChart>
//             <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//             {/* X-axis for Actual Prices */}
//             <XAxis 
//               type="number" 
//               dataKey="actualPrice" 
//               name="Actual Price" 
//               tick={{ fontSize: 12, fill: '#333' }}
//               stroke="#333"
//             >
//               <Label value="Actual Price (₹)" offset={-5} position="insideBottom" style={{ fill: '#333', fontSize: '14px' }} />
//             </XAxis>
//             {/* Y-axis for Predicted Prices */}
//             <YAxis 
//               type="number" 
//               dataKey="predictedPrice" 
//               name="Predicted Price" 
//               tick={{ fontSize: 12, fill: '#333' }}
//               stroke="#333"
//             >
//               <Label value="Predicted Price (₹)" angle={-90} position="insideLeft" style={{ fill: '#333', fontSize: '14px' }} />
//             </YAxis>
//             <Tooltip cursor={{ strokeDasharray: '3 3' }} />
//             {/* Scatter plot points */}
//             <Scatter
//               name="Price Prediction"
//               data={chartData}
//               fill="#34D399"  // Light green for scatter points
//               line={{ stroke: "#10B981", strokeWidth: 2 }} // Connecting line with dark green color
//               shape="circle"
//             />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ChartComponent;
'use client';
import React, { useEffect, useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from 'recharts';

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

const ChartComponent = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_chart_data')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
          actualPrice: actualPrice / 1_000_000, // Scaling down to millions
          predictedPrice: data.y_pred[index] / 1_000_000,
        }));
        setChartData(formattedData);
      })
      .catch((error) => console.error('Error fetching chart data:', error));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
          Actual Prices vs Predicted Prices
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis
              type="number"
              dataKey="actualPrice"
              name="Actual Price"
              tick={{ fontSize: 12, fill: '#333' }}
              stroke="#333"
            >
              <Label
                value="Actual Price (₹ in Millions)"
                offset={-5}
                position="insideBottom"
                style={{ fill: '#333', fontSize: '14px' }}
              />
            </XAxis>
            <YAxis
              type="number"
              dataKey="predictedPrice"
              name="Predicted Price"
              tick={{ fontSize: 12, fill: '#333' }}
              stroke="#333"
            >
              <Label
                value="Predicted Price (₹ in Millions)"
                angle={-90}
                position="insideLeft"
                style={{ fill: '#333', fontSize: '14px', textAnchor: 'middle' }}
              />
            </YAxis>
            <Tooltip
              formatter={(value: number) => formatNumber(value * 1_000_000)} // Revert scaling for display
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter
              name="Price Prediction"
              data={chartData}
              fill="#34D399"
              line={{ stroke: '#10B981', strokeWidth: 2 }}
              shape="circle"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;

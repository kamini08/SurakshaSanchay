'use client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
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
    <div className="mx-auto w-auto p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="ML MODEL PREDICTIONS" />
    <div className="flex justify-center items-center min-h-screen bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm font-medium text-black dark:text-white">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4 text-sm font-medium text-black dark:text-white">
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
    </div>
  );
};

export default ChartComponent;
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
//     <DefaultLayout>
//       <Breadcrumb pageName="ML MODEL PREDICTIONS" />
//       <div className="flex justify-center items-center min-h-screen bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-sm font-medium text-black dark:text-white dark:bg-boxdark dark:border-strokedark">
//           <h2 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">
//             Actual Prices vs Predicted Prices
//           </h2>
//           <ResponsiveContainer width="100%" height={350}>
//             <ScatterChart>
//               <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
//               <XAxis
//                 type="number"
//                 dataKey="actualPrice"
//                 name="Actual Price"
//                 tick={{ fontSize: 12, className: 'text-black dark:text-white text-center' }}
//               >
//                 <Label
//                   className="text-black dark:text-white text-center"
//                   value="Actual Price (₹ in Millions)"
//                   offset={-5}
//                   position="insideBottom"
//                   style={{ fontSize: '14px' }}
//                 />
//               </XAxis>
//               <YAxis
//                 type="number"
//                 dataKey="predictedPrice"
//                 name="Predicted Price"
//                 tick={{ fontSize: 12, className: 'text-black dark:text-white text-center' }}
//               >
//                 <Label
//                   className="text-black dark:text-white text-center"
//                   value="Predicted Price (₹ in Millions)"
//                   angle={-90}
//                   position="insideLeft"
//                   style={{ fontSize: '14px', textAnchor: 'middle' }}
//                 />
//               </YAxis>
//               <Tooltip
//                 formatter={(value: number) => formatNumber(value * 1_000_000)} // Revert scaling for display
//                 cursor={{ strokeDasharray: '3 3' }}
//               />
//               <Scatter
//                 name="Price Prediction"
//                 data={chartData}
//                 fill="#34D399"
//                 line={{ stroke: '#10B981', strokeWidth: 2 }}
//                 shape="circle"
//               />
//             </ScatterChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default ChartComponent;





// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// const App = () => {
//   const [categoryMaintenanceCost, setCategoryMaintenanceCost] = useState([]);
//   const [conditionMaintenanceCost, setConditionMaintenanceCost] = useState([]);
//   const [ageGroupMaintenanceCost, setAgeGroupMaintenanceCost] = useState([]);
//   const [budgetCategorySpending, setBudgetCategorySpending] = useState([]);
//   const [yearlySpendingTrends, setYearlySpendingTrends] = useState([]);

//   useEffect(() => {
//     // Fetch all data from the API
//     axios.get('http://127.0.0.1:5000/category_maintenance_cost')
//       .then((res) => setCategoryMaintenanceCost(res.data))
//       .catch((err) => console.error('Category Maintenance Cost Error:', err));

//     axios.get('http://127.0.0.1:5000/condition_maintenance_cost')
//       .then((res) => setConditionMaintenanceCost(res.data))
//       .catch((err) => console.error('Condition Maintenance Cost Error:', err));

//     axios.get('http://127.0.0.1:5000/age_group_maintenance_cost')
//       .then((res) => setAgeGroupMaintenanceCost(res.data))
//       .catch((err) => console.error('Age Group Maintenance Cost Error:', err));

//     axios.get('http://127.0.0.1:5000/budget_category_spending')
//       .then((res) => setBudgetCategorySpending(res.data))
//       .catch((err) => console.error('Budget Category Spending Error:', err));

//     axios.get('http://127.0.0.1:5000/yearly_spending_trends')
//       .then((res) => setYearlySpendingTrends(res.data))
//       .catch((err) => console.error('Yearly Spending Trends Error:', err));
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col items-center gap-12 p-4 bg-gray-100">
//       <h1 className="text-2xl font-bold">Hardware and Budget Analysis</h1>

//       {/* Category Maintenance Cost */}
//       <div className="chart-container w-full">
//         <h2 className="text-xl font-semibold mb-2">Category Maintenance Cost</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={categoryMaintenanceCost}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Maintenance_Charge" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Condition Maintenance Cost */}
//       <div className="chart-container w-full">
//         <h2 className="text-xl font-semibold mb-2">Condition Maintenance Cost</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={conditionMaintenanceCost}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Condition" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Maintenance_Charge" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Age Group Maintenance Cost */}
//       <div className="chart-container w-full">
//         <h2 className="text-xl font-semibold mb-2">Age Group Maintenance Cost</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={ageGroupMaintenanceCost}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Age_Group" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="Average_Maintenance_Cost" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Budget Category Spending */}
//       <div className="chart-container w-full">
//         <h2 className="text-xl font-semibold mb-2">Budget Category Spending</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart data={budgetCategorySpending}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Category" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Price" stackId="a" fill="#8884d8" />
//             <Bar dataKey="Maintenance_Charge" stackId="a" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Yearly Spending Trends */}
//       <div className="chart-container w-full">
//         <h2 className="text-xl font-semibold mb-2">Yearly Spending Trends</h2>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart data={yearlySpendingTrends}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Year" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="Total Cost" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default App;










// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// const MaintenanceGraphs = () => {
//   const [categoryCostData, setCategoryCostData] = useState(null);
//   const [conditionCostData, setConditionCostData] = useState(null);

//   useEffect(() => {
//     // Fetch category cost data
//     axios.get('http://127.0.0.1:5000/category-cost').then((response) => {
//       setCategoryCostData(response.data);
//     });

//     // Fetch condition cost data
//     axios.get('http://127.0.0.1:5000/condition-cost').then((response) => {
//       setConditionCostData(response.data);
//     });
//   }, []);

//   const getCategoryChartData = () => {
//     if (!categoryCostData) return null;
//     return {
//       labels: Object.keys(categoryCostData),
//       datasets: [
//         {
//           label: 'Total Maintenance Cost',
//           data: Object.values(categoryCostData),
//           backgroundColor: 'teal',
//           borderColor: 'black',
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   const getConditionChartData = () => {
//     if (!conditionCostData) return null;
//     return {
//       labels: Object.keys(conditionCostData),
//       datasets: [
//         {
//           label: 'Total Maintenance Cost',
//           data: Object.values(conditionCostData),
//           backgroundColor: ['skyblue', 'orange'],
//           borderColor: 'black',
//           borderWidth: 1,
//         },
//       ],
//     };
//   };

//   return (
//     <div>
//       <h1>Maintenance Cost Analysis</h1>
//       <div>
//         <h2>Category-wise Maintenance Cost</h2>
//         {categoryCostData ? (
//           <Bar
//             data={getCategoryChartData()}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { display: false },
//                 tooltip: { enabled: true },
//               },
//               scales: {
//                 x: { ticks: { autoSkip: false }, grid: { display: false } },
//                 y: { grid: { display: true, drawBorder: false } },
//               },
//             }}
//           />
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//       <div>
//         <h2>Maintenance Cost by Condition</h2>
//         {conditionCostData ? (
//           <Bar
//             data={getConditionChartData()}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: { display: false },
//                 tooltip: { enabled: true },
//               },
//               scales: {
//                 x: { ticks: { autoSkip: false }, grid: { display: false } },
//                 y: { grid: { display: true, drawBorder: false } },
//               },
//             }}
//           />
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MaintenanceGraphs;



// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';

// interface PredictionResults {
//   buy_price: number[];
//   maintenance_cost: number[];
//   total_price: number[];
//   annual_budget: number[];
// }

// const App: React.FC = () => {
//   const [results, setResults] = useState<PredictionResults | null>(null);
//   const [year, setYear] = useState<string>('');
//   const [category, setCategory] = useState<string>('');
  
//   const categories: string[] = [
//     "Communication Devices", "Computer and IT Equipment", "Firearms",
//     "Forensic", "Medical First Aid", "Networking Equipment",
//     "Office Supplies", "Protective Gear", "Surveillance and Tracking",
//     "Vehicle and Accessories"
//   ];

//   const fetchResults = () => {
//     if (!year || !category) {
//       console.error("Year and category are required.");
//       return;
//     }

//     axios.post('http://127.0.0.1:5000/predict', {
//       Year: parseInt(year, 10),
//       Category: category
//     })
//     .then(response => {
//       setResults(response.data as PredictionResults);
//     })
//     .catch(error => {
//       console.error("There was an error!", error);
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-blue-600">Budget Predictions</h1>

//       {/* Input fields */}
//       <div className="space-y-4 mb-6">
//         <div className="flex flex-col">
//           <label className="text-lg font-medium text-gray-700 mb-2">Year:</label>
//           <input 
//             type="number" 
//             value={year} 
//             onChange={(e) => setYear(e.target.value)} 
//             className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div className="flex flex-col">
//           <label className="text-lg font-medium text-gray-700 mb-2">Category:</label>
//           <select 
//             value={category} 
//             onChange={(e) => setCategory(e.target.value)} 
//             className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="" disabled>Select a category</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={fetchResults}
//         className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//       >
//         Get Predictions
//       </button>

//       {/* Results */}
//       {results && (
//         <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-lg">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Prediction Results</h2>
//           <div className="space-y-2">
//             <p><strong>Buy Price:</strong> {results.buy_price[0]}</p>
//             <p><strong>Maintenance Cost:</strong> {results.maintenance_cost[0]}</p>
//             <p><strong>Total Price:</strong> {results.total_price[0]}</p>
//             <p><strong>Annual Budget:</strong> {results.annual_budget[0]}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';

// interface PredictionResults {
//   buy_price: number[];
//   maintenance_cost: number[];
//   total_price: number[];
//   annual_budget: number[];
// }

// const App: React.FC = () => {
//   const [results, setResults] = useState<PredictionResults | null>(null);
//   const [year, setYear] = useState<string>('');
//   const [category, setCategory] = useState<string>('');
  
//   const categories: string[] = [
//     "Communication Devices", "Computer and IT Equipment", "Firearms",
//     "Forensic", "Medical First Aid", "Networking Equipment",
//     "Office Supplies", "Protective Gear", "Surveillance and Tracking",
//     "Vehicle and Accessories"
//   ];

//   const fetchResults = () => {
//     if (!year || !category) {
//       console.error("Year and category are required.");
//       return;
//     }

//     axios.post('http://127.0.0.1:5000/predict', {
//       Year: parseInt(year, 10),
//       Category: category
//     })
//     .then(response => {
//       setResults(response.data as PredictionResults);
//     })
//     .catch(error => {
//       console.error("There was an error!", error);
//     });
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
//       <h1 className="text-3xl font-semibold mb-6 text-blue-600">Budget Predictions</h1>

//       {/* Input fields */}
//       <div className="space-y-4 mb-6">
//         <div className="flex flex-col">
//           <label className="text-lg font-medium text-gray-700 mb-2">Year:</label>
//           <input 
//             type="number" 
//             value={year} 
//             onChange={(e) => setYear(e.target.value)} 
//             className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div className="flex flex-col">
//           <label className="text-lg font-medium text-gray-700 mb-2">Category:</label>
//           <select 
//             value={category} 
//             onChange={(e) => setCategory(e.target.value)} 
//             className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="" disabled>Select a category</option>
//             {categories.map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={fetchResults}
//         className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
//       >
//         Get Predictions
//       </button>

//       {/* Results */}
//       {results && (
//         <div className="mt-6 p-6 bg-white shadow-lg rounded-lg w-full max-w-lg">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Prediction Results</h2>
//           <div className="space-y-2">
//             <p><strong>Buy Price:</strong> {results.buy_price[0]}</p>
//             <p><strong>Maintenance Cost:</strong> {results.maintenance_cost[0]}</p>
//             <p><strong>Total Price:</strong> {results.total_price[0]}</p>
//             <p><strong>Annual Budget:</strong> {results.annual_budget[0]}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
// 'use client';
// import { useState } from "react";

// export default function Predict() {
//   const categories = [
//     "Communication Devices", 
//     "Computer and IT Equipment", 
//     "Firearms",
//     "Forensic", 
//     "Medical First Aid", 
//     "Networking Equipment",
//     "Office Supplies", 
//     "Protective Gear", 
//     "Surveillance and Tracking",
//     "Vehicle and Accessories"
//   ];

//   const [formData, setFormData] = useState({ Year: "", Category: "" });
//   const [results, setResults] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setResults(null);

//     try {
//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch predictions.");
//       }

//       const data = await response.json();
//       setResults(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
//       <h1>Budget Prediction</h1>
//       <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
//         <div style={{ marginBottom: "10px" }}>
//           <label htmlFor="Year" style={{ display: "block", marginBottom: "5px" }}>
//             Year:
//           </label>
//           <input
//             type="number"
//             id="Year"
//             name="Year"
//             value={formData.Year}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px" }}
//           />
//         </div>
//         <div style={{ marginBottom: "10px" }}>
//           <label htmlFor="Category" style={{ display: "block", marginBottom: "5px" }}>
//             Category:
//           </label>
//           <select
//             id="Category"
//             name="Category"
//             value={formData.Category}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px" }}
//           >
//             <option value="">Select a category</option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button
//           type="submit"
//           style={{
//             padding: "10px 20px",
//             backgroundColor: "#007BFF",
//             color: "#FFF",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Predict
//         </button>
//       </form>

//       {error && (
//         <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {results && (
//         <div style={{ marginTop: "20px", textAlign: "center" }}>
//           <h2>Prediction Results</h2>
//           <p>
//             <strong>Buy Price:</strong> {results.buy_price[0]}
//           </p>
//           <p>
//             <strong>Maintenance Cost:</strong> {results.maintenance_cost[0]}
//           </p>
//           <p>
//             <strong>Total Price:</strong> {results.total_price[0]}
//           </p>
//           <p>
//             <strong>Annual Budget:</strong> {results.annual_budget[0]}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

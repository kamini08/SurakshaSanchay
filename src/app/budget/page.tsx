'use client';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse'; // CSV parsing library
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of the CSV row
interface InventoryData {
  Price: string;
  Quantity: string;
  Item_Age: string;
  Maintenance_Charge: string;
  // Add more fields as needed
}

// Define the structure for the chart data
interface ChartData {
  actual: number;
  predicted: number;
}

const PricePredictionChart = () => {
  // Explicitly define data as an array of ChartData
  const [data, setData] = useState<ChartData[]>([]);
  console.log(data);

  useEffect(() => {
    Papa.parse('/hardware_inventory_realistic_prices.csv', {
      download: true,
      header: true, // If your CSV has headers
     
      complete: (result) => {
        const chartData = (result.data as InventoryData[]).slice(0, 30).map((row) => ({
          actual: parseFloat(row.Price), // Ensure values are parsed as numbers
          predicted: calculatePredictedPrice(row),
        }));
        setData(chartData); // Set the parsed data in state
      },
    });
  }, []);

  const calculatePredictedPrice = (row: InventoryData): number => {
    // You can replace this with your actual prediction logic
    return (parseFloat(row.Quantity) + parseFloat(row.Item_Age)) * 100;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="actual" stroke="#8884d8" />
        <Line type="monotone" dataKey="predicted" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PricePredictionChart;

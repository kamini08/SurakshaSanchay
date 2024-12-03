'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get_chart_data')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Combine y_test and y_pred data into a single array for Recharts
        const formattedData = data.y_test.map((actualPrice: number, index: number) => ({
          name: `Point ${index + 1}`,  // Added a 'name' key for each point to label them on the X-Axis
          actualPrice,
          predictedPrice: data.y_pred[index],
        }));
        setChartData(formattedData);
      })
      .catch((error) => {
        console.error('Error fetching chart data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Actual Prices vs Predicted Prices</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="actualPrice" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="predictedPrice" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;

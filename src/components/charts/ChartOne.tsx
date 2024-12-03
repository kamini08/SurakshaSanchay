'use client';
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart: React.FC = () => {
    const categories = [
        "Forensic",
        "Firearms",
        "Protective",
        "Vehicles",
        "Monitoring",
        "Net Equipment",
        "IT Equipment",
        "Comm. Devices",
        "Office Supplies",
        "Medical"
    ];

    const exampleData = [
        { category: "Forensic", total: 10 },
        { category: "Firearms", total: 15 },
        { category: "Protective", total: 20 },
        { category: "Vehicles", total: 5 },
        { category: "Monitoring", total: 8 },
        { category: "Net Equipment", total: 12 },
        { category: "IT Equipment", total: 18 },
        { category: "Comm. Devices", total: 7 },
        { category: "Office Supplies", total: 9 },
        { category: "Medical", total: 11 },
    ];

    const [data, setData] = useState<number[]>(exampleData.map(item => item.total));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/pie-data'); // Ensure this URL is correct
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                // Assuming result is an array of objects with category and total
                const fetchedData = categories.map(category => {
                    const item = result.find((data: any) => data.category === category);
                    return item ? item.total : 0; // Default to 0 if category not found
                });
                setData(fetchedData);
            } catch (err) {
                console.error("Fetch error:", err);
                // Set data to example data on error
                setData(exampleData.map(item => item.total));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options: ApexOptions = {
        chart: {
            type: 'pie',
            height: 350,
        },
        labels: categories,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                },
                legend: {
                    position: 'bottom',
                },
            },
        }],
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={data}
                    type="pie"
                    height={350}
                />
            </div>
        </div>
    );
};

export default PieChart;
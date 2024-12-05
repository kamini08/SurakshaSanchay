'use client';
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart: React.FC = () => {
    const categories = [
        "COMMUNICATION_DEVICES",
        "COMPUTER_AND_IT_EQUIPMENT",
        "NETWORKING_EQUIPMENT",
        "SURVEILLANCE_AND_TRACKING",
        "VEHICLE_AND_ACCESSORIES",
        "PROTECTIVE_GEAR",
        "FIREARMS",
        "FORENSIC",
        "MEDICAL_FIRST_AID",
        "OFFICE_SUPPLIES",
    ];

    const exampleData = [
        { category: "COMMUNICATION_DEVICES", total: 0 },
        { category: "COMPUTER_AND_IT_EQUIPMENT", total: 0 },
        { category: "NETWORKING_EQUIPMENT", total: 0 },
        { category: "SURVEILLANCE_AND_TRACKING", total: 0 },
        { category: "VEHICLE_AND_ACCESSORIES", total: 0 },
        { category: "PROTECTIVE_GEAR", total: 0 },
        { category: "FIREARMS", total: 0 },
        { category: "FORENSIC", total: 0 },
        { category: "MEDICAL_FIRST_AID", total: 0 },
        { category: "OFFICE_SUPPLIES", total: 0 },
    ];

    const [data, setData] = useState<number[]>(exampleData.map(item => item.total));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/Dashboard'); // Replace with your backend endpoint
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const temp = await response.json();
                console.log(temp);
                const result = temp.data;

                // Map categories to the fetched data or fallback to zero/placeholder
                const fetchedData = categories.map(category => {
                    const item = result.find((data: any) => data.category === category);
                    return item ? (item.total > 0 ? item.total : 0.001) : 0.001; // Placeholder for zero
                });

                setData(fetchedData);
            } catch (err) {
                console.error("Fetch error:", err);
                // Set to example data in case of an error
                setData(exampleData.map(item => 0.001));
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
        colors: [
            '#FF4560', // COMMUNICATION_DEVICES
            '#008FFB', // COMPUTER_AND_IT_EQUIPMENT
            '#00E396', // NETWORKING_EQUIPMENT
            '#775DD0', // SURVEILLANCE_AND_TRACKING
            '#FEB019', // VEHICLE_AND_ACCESSORIES
            '#FF66C3', // PROTECTIVE_GEAR
            '#A5D6A7', // FIREARMS
            '#FFB74D', // FORENSIC
            '#64B5F6', // MEDICAL_FIRST_AID
            '#BA68C8', // OFFICE_SUPPLIES
        ],
        legend: {
            show: true,
            formatter: function (seriesName, opts) {
                const value = opts.w.globals.series[opts.seriesIndex];
                return `${seriesName}: ${value > 0 ? value.toFixed(2) : 0}`;
            },
        },
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
            <h2 className="text-3xl mb-5">Inventory Distribution</h2>
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

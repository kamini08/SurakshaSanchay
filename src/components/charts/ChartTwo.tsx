'use client';
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface DataItem {
    status: string;
    total: number;
}

const BarChart: React.FC = () => {
    const defaultData: DataItem[] = [
        { status: "Pending", total: 0 },
        { status: "In Progress", total: 0 },
        { status: "Completed", total: 0 },
        { status: "On Hold", total: 0 },
    ];

    const exampleData: DataItem[] = [
        { status: "Pending", total: 5 },
        { status: "In Progress", total: 10 },
        { status: "Completed", total: 15 },
        { status: "On Hold", total: 3 },
    ];

    const [data, setData] = useState<DataItem[]>(defaultData);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/data'); // Ensure this URL is correct
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result: DataItem[] = await response.json();
                setData(result.length > 0 ? result : defaultData); // Use default data if result is empty
            } catch (err) {
                // Log the error to the console for debugging
                console.error("Fetch error:", err);
                // Set data to example data on error
                setData(exampleData);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4, // Use borderRadius for rounded edges
            },
        },
        dataLabels: {
            enabled: true,
        },
        xaxis: {
            categories: data.map(item => item.status), // Extract status for x-axis
        },
        yaxis: {
            title: {
                text: 'Total Items',
            },
        },
        fill: {
            colors: ['#008FFB'], // Customize bar color
        },
    };

    const series = [{
        name: 'Total Items',
        data: data.map(item => item.total), // Extract total items for y-axis
    }];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height={350}
                />
            </div>
        </div>
    );
};

export default BarChart;
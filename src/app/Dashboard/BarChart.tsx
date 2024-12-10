'use client';
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { toast } from "react-toastify";

interface MaintenanceRequest {
    status: string; // Status of the maintenance request
}

interface DataItem {
    status: string;
    total: number;
}

const BarChart: React.FC = () => {
    const defaultData: DataItem[] = [
        { status: "PENDING", total: 0 },
        { status: "DISCARDED", total: 0 },
        { status: "COMPLETED", total: 0 },
        { status: "APPROVED", total: 0 },
    ];

    const [data, setData] = useState<DataItem[]>(defaultData);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/maintenance/request'); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();

                // Assuming backend returns an array of maintenance requests
                const maintenanceRequests: MaintenanceRequest[] = result.data;

                // Calculate total counts for each status
                const statusCounts: Record<string, number> = maintenanceRequests.reduce((acc, request) => {
                    const status = request.status.toUpperCase(); // Normalize to uppercase
                    acc[status] = (acc[status] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                // Map the counts to the expected format
                const formattedData = defaultData.map(item => ({
                    status: item.status,
                    total: statusCounts[item.status.toUpperCase()] || 0,
                }));

                setData(formattedData);
            } catch (err) {
                console.error("Fetch error:", err);
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 3000,
                  }); 
                // Fall back to default data on error
                setData(defaultData);
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
            toolbar: {
                show: false, // Hide the toolbar
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 4, // Rounded edges for the bars
            },
        },
        dataLabels: {
            enabled: true, // Enable data labels
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
        data: data.map(item => item.total), // Extract totals for the y-axis
    }];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="text-3xl mb-5">Maintenance Status</h2>
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

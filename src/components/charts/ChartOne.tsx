'use client';
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const PieChart: React.FC = () => {
    const options: ApexOptions = {
        labels: [
            'Forensic',
            'Firearms',
            'Protective',
            'Vehicles',
            'Monitoring',
            'Networking Equipment',
            'IT Equipment',
            'Communication Devices',
            'Office Supplies',
            'Medical',
        ],
        chart: {
            type: 'pie', // Changed from 'donut' to 'pie'
            width: 380,
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                },
            },
        ],
        legend: {
            position: 'bottom',
            fontSize: '14px',
        },
        plotOptions: {
            pie: {
                customScale: 1,
            },
        },
        dataLabels: {
            enabled: true,
        },
    };

    const series = [10, 7, 11, 5, 3, 11, 25, 10, 15, 20];

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="pie" // Ensure this matches the `chart.type`
                />
            </div>
        </div>
    );
};

export default PieChart;

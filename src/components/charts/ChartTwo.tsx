// 'use client';
// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const LineChart: React.FC = () => {
//     const [state, setState] = useState({
//         series: [{
//                 name: "Total items",
//                 data: [1215, 1461, 1531, 1609, 1696, 1895, 1982, 2245, 2345]
//             },{
//                 name: "Items issued",
//                 data: [910, 1021, 1071, 1176, 1231, 1275, 1300, 1315, 1360]
//             },{
//                 name: "Items missing",
//                 data: [12, 41, 35, 51, 92, 62, 269, 91, 122]
//             }],
//             options: {
//               chart: {
//                 height: 350,
//                 type: 'line',
//                 zoom: {
//                   enabled: false
//                 }
//               },
//               dataLabels: {
//                 enabled: false
//               },
//               stroke: {
//                 curve: 'straight'
//               },
//               title: {
//                 text: 'Item Trends by Month',
//                 align: 'left'
//               },
//               grid: {
//                 row: {
//                   colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//                   opacity: 0.5
//                 },
//               },
//               xaxis: {
//                 categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
//               },},},);

//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart options={state.options} series={state.series} type="line" />
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     );
// };

// export default LineChart;
'use client';
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts"; // Import ApexOptions for proper typing

const LineChart: React.FC = () => {
    const [state, setState] = useState<{
        series: {
            name: string;
            data: number[];
        }[];
        options: ApexOptions; // Explicitly use ApexOptions type
    }>({
        series: [{
            name: "Total items",
            data: [1215, 1461, 1531, 1609, 1696, 1895, 1982, 2245, 2345]
        }, {
            name: "Items issued",
            data: [910, 1021, 1071, 1176, 1231, 1275, 1300, 1315, 1360]
        }, {
            name: "Items missing",
            data: [12, 41, 35, 51, 92, 62, 269, 91, 122]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',  // Correct type for line chart
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Item Trends by Month',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // alternating row colors
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            },
        },
    });

    return (
        <div>
            <div id="chart">
                <ReactApexChart 
                    options={state.options} 
                    series={state.series} 
                    type="line"  // Match with `chart.type` in `options`
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default LineChart;

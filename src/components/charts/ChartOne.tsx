// 'use client';
// import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";

// const PieChart: React.FC = () => {
//     const [state, setState] = useState({
//         series: [10,7,11,5,3,11,25,10,15,20],
        
//             options: {
//               labels: ['forensic', 'firearms', 'protective', 'vehicles','monitoring','net eqipment','it equipment','comm. devices','office supplies','medical'],
//               chart: {
//                 width:10,
//                 type: 'donut',
//               },
              
//               responsive: [{
//                 breakpoint: 480,
//                 options: {
//                   chart: {
//                     width: 100
//                   },
                  
//                 }
//               }],
            
//         legend: {
//                     position: 'bottom',
//                     fontSize: "20rem"
//                   },    
//        plotOptions: {
//       pie: {
//         customScale: 1
//       }
//     },
//     dataLabels:{
     
//     }   
//   } ,  
//           });

//     return (
//         <div>
//             <div id="chart">
//                 <ReactApexChart options={state.options} series={state.series} type="pie" />
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     );
// };

// export default PieChart;
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
            type: 'donut', // Ensure this is strictly one of ApexCharts' accepted types
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
            fontSize: '14px', // Adjusted font size for better clarity
        },
        plotOptions: {
            pie: {
                customScale: 1,
            },
        },
        dataLabels: {
            enabled: true, // Optional, for visibility of labels
        },
    };

    const series = [10, 7, 11, 5, 3, 11, 25, 10, 15, 20];

    return (
        <div>
            <div id="chart">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="donut" // Ensure this matches the `chart.type`
                />
            </div>
        </div>
    );
};

export default PieChart;

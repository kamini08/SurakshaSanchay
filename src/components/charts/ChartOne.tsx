'use client';
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart: React.FC = () => {
    const [state, setState] = useState({
        series: [10,7,11,5,3,11,25,10,15,20],
        
            options: {
              labels: ['forensic', 'firearms', 'protective', 'vehicles','monitoring','net eqipment','it equipment','comm. devices','office supplies','medical'],
              chart: {
                width:10,
                type: 'donut',
              },
              
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 100
                  },
                  
                }
              }],
            
        legend: {
                    position: 'bottom',
                    fontSize: "20rem"
                  },    
       plotOptions: {
      pie: {
        customScale: 1
      }
    },
    dataLabels:{
     
    }   
  } ,  
          });

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="pie" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default PieChart;
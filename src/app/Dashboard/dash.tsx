"use client";
import React, { useState, useEffect } from "react";
import CardDataStats from "./Card";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

interface Package {
  category: string;
  total: number;
}

const MonthlyReport = () => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  const openModal = (title: string) => {
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalTitle(null);
  };

  const cardTitles = [
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

  const cardImages = [
    "/images/iconimages/forensics.png",
    "/images/iconimages/firearms.png",
    "/images/iconimages/protective.png",
    "/images/iconimages/vehicles.png",
    "/images/iconimages/monitoring.png",
    "/images/iconimages/net-equipment.png",
    "/images/iconimages/it-equipment.png",
    "/images/iconimages/comm-devices.png",
    "/images/iconimages/office-supplies.png",
    "/images/iconimages/medical.png",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Dashboard", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setPackageData(data.data);
        } else {
          console.error("Failed to fetch package data");
        }
      } catch (error) {
        console.error("Error fetching data:" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCountByCategory = (category: string) => {
    const categoryData = packageData.find((item) => item.category === category);
    return categoryData ? categoryData.total : 0;
  };

  const categoryCounts = packageData.reduce(
    (acc, item) => ({ ...acc, [item.category]: item.total }),
    {}
  );

  const series = Object.values(categoryCounts);
  const labels = Object.keys(categoryCounts);

  return (
    <>
      {/* Responsive grid layout for cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6">
        {cardTitles.map((title, index) => {
          const count = getCountByCategory(title);

          return (
            <CardDataStats
              key={index}
              statusCounts={{ [title]: count }}
              onClick={() => openModal(title)}
              icon={cardImages[index]} // Pass the corresponding icon
            />
          );
        })}
      </div>

      {/* Charts section */}
      <div className="flex flex-wrap justify-between gap-6 mt-10">
        <div className="flex-1 min-w-[300px] max-w-[48%] bg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <BarChart />
        </div>
        <div className="flex-1 min-w-[300px] max-w-[48%] bg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <PieChart />
        </div>
      </div>
    </>
  );
};

export default MonthlyReport;

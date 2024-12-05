"use client";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import CardDataStats from "../../components/CardDataStats";
import LineChart from "@/components/charts/ChartTwo";
import PieChart from "@/components/charts/ChartOne";
import Modal from "react-modal";

interface Package {
  category: string;
  status: string;
}

const MonthlyReport = () => {
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [packageData, setPackageData] = useState<Package[]>([]); // State to hold package data
  const [loading, setLoading] = useState(true);

  const openModal = (title: string) => {
    setModalTitle(title);
  };

  const closeModal = () => {
    setModalTitle(null);
  };

  const cardTitles = [
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/inventory", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setPackageData(data);
        }
      } catch (error) {
        console.error("Error fetching data:" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to count items by category
  const countItemsByCategory = (category?: string) => {
    const counts: { [key: string]: number } = {};

    packageData.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });

    if (category) {
      // Return an object with the count for the specific category
      return { [category]: counts[category] || 0 };
    }

    return counts; // Return all counts
  };

  const categoryCounts = countItemsByCategory(); // Get counts for all categories
  const series = Object.values(categoryCounts); // Get the counts as an array
  const labels = Object.keys(categoryCounts); // Get the category names as labels

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-5 lg:gap-4">
        {cardTitles.map((title, index) => {
          const statusCounts = countItemsByCategory(title); // Now this returns an object
          return (
            <CardDataStats
              key={index}
              title={title}
              statusCounts={statusCounts}
              onClick={() => openModal(title)}
            />
          );
        })}
      </div>

      <Modal
        isOpen={modalTitle !== null}
        onRequestClose={closeModal}
        contentLabel="Card Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>{modalTitle}</h2>
        <p>Details about {modalTitle}...</p>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <div className="flex space-x-5">
    <div className="min-w-150 bg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-10">
        <LineChart />
    </div>
    <div className="min-w-150 bg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark mt-10">
        <PieChart  /> {/* Pass series and labels to PieChart */}
    </div>
</div>
    </>
  );
}

export default MonthlyReport;